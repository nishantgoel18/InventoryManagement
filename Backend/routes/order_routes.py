from flask import Blueprint, request, jsonify
from main import db
from sqlalchemy.orm import joinedload

from models.order import Order
from models.order_item import OrderItem
from models.product import Product
from models.inventory import Inventory

order_bp = Blueprint('orders', __name__)

# GET all orders
@order_bp.route('/', methods=['GET'])
def get_orders():
    orders = Order.query.options(
        joinedload(Order.customer),
        joinedload(Order.items).joinedload(OrderItem.product)
    ).all()
    return jsonify([o.to_dict() for o in orders])

# GET single order
@order_bp.route('/<int:id>', methods=['GET'])
def get_order(id):
    order = Order.query.options(
        joinedload(Order.customer),
        joinedload(Order.items).joinedload(OrderItem.product)
    ).get_or_404(id)
    return jsonify(order.to_dict())

# POST create order
@order_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()

    if not data.get('customer_id') or not data.get('items'):
        return jsonify({'error': 'customer_id and items are required'}), 400

    # stock check first
    for item in data['items']:
        product   = Product.query.get(item['product_id'])
        inventory = Inventory.query.filter_by(product_id=item['product_id']).first()

        if not product:
            return jsonify({'error': f'Product {item["product_id"]} not found'}), 404
        if not inventory or inventory.quantity < item['quantity']:
            return jsonify({'error': f'Insufficient stock for {product.name}'}), 400

    # create order
    order = Order(customer_id=data['customer_id'])
    db.session.add(order)
    db.session.flush()

    total = 0
    for item in data['items']:
        product    = Product.query.get(item['product_id'])
        inventory  = Inventory.query.filter_by(product_id=item['product_id']).first()
        unit_price = product.price

        order_item = OrderItem(
            order_id   = order.id,
            product_id = item['product_id'],
            quantity   = item['quantity'],
            unit_price = unit_price
        )
        db.session.add(order_item)

        # deduct inventory
        inventory.quantity -= item['quantity']
        total += float(unit_price) * item['quantity']

    order.total = total
    db.session.commit()
    return jsonify(order.to_dict()), 201

# PUT update order status
@order_bp.route('/<int:id>/status', methods=['PUT'])
def update_order_status(id):
    order = Order.query.options(
        joinedload(Order.customer),
        joinedload(Order.items).joinedload(OrderItem.product)
    ).get_or_404(id)
    data  = request.get_json()

    allowed_statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    if data.get('status') not in allowed_statuses:
        return jsonify({'error': f'Invalid status. Allowed: {allowed_statuses}'}), 400

    order.status = data['status']
    db.session.commit()
    return jsonify(order.to_dict())

# DELETE order
@order_bp.route('/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.options(
        joinedload(Order.customer),
        joinedload(Order.items).joinedload(OrderItem.product)
    ).get_or_404(id)

    # restore inventory
    for item in order.items:
        inventory = Inventory.query.filter_by(product_id=item.product_id).first()
        if inventory:
            inventory.quantity += item.quantity

    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted and inventory restored'})
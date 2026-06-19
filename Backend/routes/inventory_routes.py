from flask import Blueprint, request, jsonify
from main import db
from models.inventory import Inventory

inventory_bp = Blueprint('inventory', __name__)

# GET all inventory
@inventory_bp.route('/', methods=['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    return jsonify([i.to_dict() for i in inventory])

# GET single inventory
@inventory_bp.route('/<int:id>', methods=['GET'])
def get_inventory_item(id):
    item = Inventory.query.get_or_404(id)
    return jsonify(item.to_dict())

# GET low stock items
@inventory_bp.route('/low-stock', methods=['GET'])
def get_low_stock():
    items = Inventory.query.filter(
        Inventory.quantity <= Inventory.low_stock_threshold
    ).all()
    return jsonify([i.to_dict() for i in items])

# PUT update inventory quantity
@inventory_bp.route('/<int:id>', methods=['PUT'])
def update_inventory(id):
    item = Inventory.query.get_or_404(id)
    data = request.get_json()

    item.quantity            = data.get('quantity', item.quantity)
    item.low_stock_threshold = data.get('low_stock_threshold', item.low_stock_threshold)

    db.session.commit()
    return jsonify(item.to_dict())
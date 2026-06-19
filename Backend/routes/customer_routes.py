from flask import Blueprint, request, jsonify
from main import db
from models.customer import Customer

customer_bp = Blueprint('customers', __name__)

# GET all customers
@customer_bp.route('/', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([c.to_dict() for c in customers])

# GET single customer
@customer_bp.route('/<int:id>', methods=['GET'])
def get_customer(id):
    customer = Customer.query.get_or_404(id)
    return jsonify(customer.to_dict())

# POST create customer
@customer_bp.route('/', methods=['POST'])
def create_customer():
    data = request.get_json()
    if not data.get('name') or not data.get('email'):
        return jsonify({'error': 'name and email are required'}), 400

    if Customer.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'email already exists'}), 409

    customer = Customer(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone')
    )
    db.session.add(customer)
    db.session.commit()
    return jsonify(customer.to_dict()), 201

# PUT update customer
@customer_bp.route('/<int:id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get_or_404(id)
    data = request.get_json()

    customer.name  = data.get('name', customer.name)
    customer.email = data.get('email', customer.email)
    customer.phone = data.get('phone', customer.phone)

    db.session.commit()
    return jsonify(customer.to_dict())

# DELETE customer
@customer_bp.route('/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({'message': 'Customer deleted successfully'})
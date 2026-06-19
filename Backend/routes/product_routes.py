from flask import Blueprint, request, jsonify, current_app
from main import db
from models.product import Product
from models.inventory import Inventory
import os
from werkzeug.utils import secure_filename

product_bp = Blueprint('products', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# GET all products
@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

# GET single product
@product_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

# POST create product
@product_bp.route('/', methods=['POST'])
def create_product():
    # form data se lo, JSON se nahi
    name        = request.form.get('name')
    description = request.form.get('description')
    price       = request.form.get('price')
    sku         = request.form.get('sku')

    if not name or not price:
        return jsonify({'error': 'name and price are required'}), 400

    if Product.query.filter_by(sku=sku).first():
        return jsonify({'error': 'SKU already exists'}), 409

    product = Product(
        name=name,
        description=description,
        price=price,
        sku=sku
    )
    db.session.add(product)
    db.session.flush()

    # image handle karo saath mein
    file = request.files.get('file')
    if file and allowed_file(file.filename):
        filename          = secure_filename(f'product_{product.id}_{file.filename}')
        save_path         = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        product.image = f'uploads/{filename}'

    # auto create inventory
    inventory = Inventory(product_id=product.id)
    db.session.add(inventory)
    db.session.commit()

    return jsonify(product.to_dict()), 201

# PUT update product
@product_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)

    product.name        = request.form.get('name', product.name)
    product.description = request.form.get('description', product.description)
    product.price       = request.form.get('price', product.price)
    product.sku         = request.form.get('sku', product.sku)

    # image update karo agar aayi hai
    file = request.files.get('file')
    if file and allowed_file(file.filename):
        # purani image delete karo
        if product.image:
            old_path = os.path.join(current_app.root_path, product.image)
            if os.path.exists(old_path):
                os.remove(old_path)

        filename          = secure_filename(f'product_{id}_{file.filename}')
        save_path         = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        product.image = f'uploads/{filename}'

    db.session.commit()
    return jsonify(product.to_dict())

# DELETE product
@product_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

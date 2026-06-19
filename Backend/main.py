import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from extensions import db, jwt

from flask import request, jsonify, send_from_directory

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    from routes.customer_routes import customer_bp
    from routes.product_routes import product_bp
    from routes.order_routes import order_bp
    from routes.inventory_routes import inventory_bp

    app.register_blueprint(customer_bp, url_prefix='/api/customers')
    app.register_blueprint(product_bp, url_prefix='/api/products')
    app.register_blueprint(order_bp, url_prefix='/api/orders')
    app.register_blueprint(inventory_bp, url_prefix='/api/inventory')

    @app.route('/uploads/<filename>')
    def serve_uploads(filename):    
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
   
    @app.before_request
    def handle_options():
        if request.method == 'OPTIONS':
            return jsonify({}), 200

    @app.errorhandler(404)
    def not_found(e):
        from flask import jsonify
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        from flask import jsonify
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

    @app.errorhandler(413)
    def too_large(e):
        from flask import jsonify
        return jsonify({'error': 'File too large, max 5MB'}), 413

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', debug=app.config['DEBUG'], port=8000)

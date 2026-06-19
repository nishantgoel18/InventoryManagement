from main import db
from datetime import datetime
import os

class Product(db.Model):
    __tablename__ = 'products'
    
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(100), nullable=False)
    description      = db.Column(db.Text, unique=True, nullable=False)
    price      = db.Column(db.Numeric(10, 2), default=0.0)
    sku        = db.Column(db.String(10), nullable=False)
    image      = db.Column(db.String(255), nullable=False, default='default.jpg')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        base_url = os.getenv('BASE_URL', 'http://localhost:5000')
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'sku': self.sku,
            'image': f'{base_url}/{self.image}' if self.image else None,
            'created_at': self.created_at.isoformat()
        }

    def __repr__(self):
        return f'<Product {self.name}>'
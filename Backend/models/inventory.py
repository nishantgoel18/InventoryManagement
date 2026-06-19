from main import db
from datetime import datetime

class Inventory(db.Model):
    __tablename__ = 'inventory'

    id                  = db.Column(db.Integer, primary_key=True)
    product_id          = db.Column(db.Integer, db.ForeignKey('products.id'), unique=True, nullable=False)
    quantity            = db.Column(db.Integer, default=0, nullable=False)
    low_stock_threshold = db.Column(db.Integer, default=10)
    updated_at          = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    product             = db.relationship('Product', backref=db.backref('inventory', uselist=False))

    @property
    def is_low_stock(self):
        return self.quantity <= self.low_stock_threshold

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product': self.product.to_dict() if self.product else None,
            'quantity': self.quantity,
            'low_stock_threshold': self.low_stock_threshold,
            'is_low_stock': self.is_low_stock,
            'updated_at': self.updated_at.isoformat()
        }

    def __repr__(self):
        return f'<Inventory product_id={self.product_id} qty={self.quantity}>'
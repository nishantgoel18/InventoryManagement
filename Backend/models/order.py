from main import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id          = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    status      = db.Column(db.String(50), default='pending')  # pending, confirmed, shipped, delivered, cancelled
    total       = db.Column(db.Numeric(10, 2), default=0.0)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at  = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer    = db.relationship('Customer', backref='orders')
    items       = db.relationship('OrderItem', backref='order', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'customer': self.customer.to_dict() if self.customer else None,
            'status': self.status,
            'total': float(self.total),
            'items': [item.to_dict() for item in self.items],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def __repr__(self):
        return f'<Order {self.id} - {self.status}>'
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'postgresql://nishantgoyal:""@localhost:5432/mydb'
)
app.config['UPLOAD_FOLDER'] = 'uploads/'

db = SQLAlchemy(app)
CORS(app)            # allow React frontend

if __name__ == '__main__':
    app.run(debug=True)
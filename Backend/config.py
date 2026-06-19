import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://inventory_db_n2kr_user:pzzfLziEr28CFRiEVDN41EHhlearDMt6@dpg-d8qfuim8bjmc738mihk0-a/inventory_db_n2kr')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-prod')
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads/')
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024
    DEBUG = os.getenv('FLASK_DEBUG', 'true') == 'true'
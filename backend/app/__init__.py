from flask import Flask
from flask_cors import CORS
from app.routes.detection_routes import detection_bp
from app.routes.auth_routes import auth_bp
from app.extensions import db, jwt, bcrypt
import os
import secrets

def create_app():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

    app = Flask(__name__)

    # 🔐 Strong Secret Key (64 hex characters)
    strong_secret = secrets.token_hex(32)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = strong_secret
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600  # 1 hour expiry

    CORS(app)

    # 🔌 Initialize Extensions
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # 📦 Register Blueprints
    app.register_blueprint(detection_bp)
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    with app.app_context():
        db.create_all()

    return app
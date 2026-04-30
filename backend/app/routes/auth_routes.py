from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.extensions import db, bcrypt
from app.models.user import User

auth_bp = Blueprint("auth", __name__)

# 📝 Register Route
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Validate fields
    if not username or not email or not password:
        return jsonify({"msg": "Username, email and password required"}), 400

    # Check if username exists
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400

    # Check if email exists
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 400

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    # Create user
    new_user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201


# 🔑 Login Route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": access_token}), 200

    return jsonify({"msg": "Invalid credentials"}), 401
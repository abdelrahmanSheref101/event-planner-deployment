import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from models.user_model import db, bcrypt, User


auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(Name=data['Name'], email=data['email'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=json.dumps({
            "id": user.id,
            "Name": user.Name,
            "email": user.email,
            "role": user.role.value
        }))
        return jsonify({
            "message": "Login successful",
            "token": access_token
        }), 200
    return jsonify({"error": "Invalid email or password"}), 401

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user = get_jwt_identity()
    if isinstance(current_user, str):
        current_user = json.loads(current_user)

    user = User.query.get(current_user['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.Name,
        "email": user.email
    }), 200


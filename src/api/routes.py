"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#Funcion para crear el usuario en bd
@api.route('/signup', methods=['POST'])
def signup():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Check if the user already exists
    user = User.query.filter_by(email=email).first()

    if user is not None:
        # The user was found on the database
        return jsonify({"msg": "User already exists"}), 401

    # Create a new user and add it to the database
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


#funcion para loguear el usuario en bd
@api.route('/login', methods=['POST'])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.email, expires_delta=timedelta(hours=1))
    return jsonify({ "token": access_token, "user_id": user.id })


#Funcion privada al tenet token de autorizacion
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    
    user_email = get_jwt_identity()
    return jsonify({
        "msg": "Welcome to the private endpoint",
        "email": user_email
    }), 200

#Funcion para obtener todos los usuarios de la bd
@api.route('/usuarios', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

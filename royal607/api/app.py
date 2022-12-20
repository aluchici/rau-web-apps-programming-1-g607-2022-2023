import json

from flask import Flask, request
from flask_cors import CORS

from royal607.api.account import signup, signin, edit_user, delete_user, get_user_details

app = Flask("royal607-api")
CORS(app, resources={r"/api/*": {"origins": "*"}})

# TODO: Change this value to match the path to your copy of the database file
connection_string = "/Users/luchicla/Work/RAU/rau-web-apps-programming-1-g607-2022-2023/royal607/datastore/royal607.db"


@app.route('/api/v1/version', methods=["GET"])
def welcome():
    version = {
        "name": "royal607-api",
        "version": "0.0.1",
        "created_by": "G607"
    }
    return json.dumps(version), 200


@app.route('/api/v1/register', methods=["POST"])
def register():
    try:
        body = request.json
        signup(body, connection_string)
        return "{}", 200, {"Content-Type": "application/json"}
    except Exception as e:
        error_message = {"data": f"Failed to create user. Cause: {e}."}
        return json.dumps(error_message), 500


@app.route("/api/v1/authenticate", methods=["POST"])
def authenticate():
    try:
        body = request.json
        existing_user = signin(body, connection_string)
        response = existing_user.to_json()
        return response, 200, {"Content-Type": "application/json"}
    except Exception as e:
        error_message = {"data": f"Failed to authenticate user. Cause: {e}."}
        return json.dumps(error_message), 500


@app.route("/api/v1/users/<user_id>", methods=["GET", "PUT", "DELETE"])
def account(user_id):
    if request.method == "GET":
        try:
            user = get_user_details(user_id, connection_string)
            response = user.to_json()
            return response, 200, {"Content-Type": "application/json"}
        except Exception as e:
            error_message = {"data": f"Failed to get all users. Cause: {e}."}
            return json.dumps(error_message), 500

    if request.method == "PUT":
        try:
            body = request.json
            body["id"] = user_id
            edit_user(body, connection_string)
            return "{}", 200, {"Content-Type": "application/json"}
        except Exception as e:
            error_message = {"data": f"Failed to edit user details. Cause: {e}."}
            return json.dumps(error_message), 500

    if request.method == "DELETE":
        try:
            delete_user(id=user_id, connection_string=connection_string)
            return "{}", 200, {"Content-Type": "application/json"}
        except Exception as e:
            error_message = {"data": f"Failed to delete user details. Cause: {e}."}
            return json.dumps(error_message), 500


app.run(debug=True, port=5607)

import json

from flask import Flask, request

from royal607.api.account import signup, signin, edit_user, delete_user
from royal607.api.repository import get_all_users
from royal607.api.users import User

app = Flask("royal607-api")

connection_string = "../datastore/royal607.db"


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
        return "", 204
    except Exception as e:
        error_message = {"data": f"Failed to create user. Cause: {e}."}
        return json.dumps(error_message), 500


@app.route("/api/v1/authenticate", methods=["POST"])
def authenticate():
    try:
        body = request.json
        existing_user = signin(body, connection_string)
        response = existing_user.to_json()
        return response, 200
    except Exception as e:
        error_message = {"data": f"Failed to authenticate user. Cause: {e}."}
        return json.dumps(error_message), 500


@app.route("/api/v1/users/<user_id>", methods=["GET", "PUT", "DELETE"])
def account(user_id):
    if request.method == "GET":
        try:
            # TODO: Change get_all_users with a new function that gets user details by id
            users = get_all_users(connection_string)
            response = [u.to_dict() for u in users]
            response = json.dumps(response)
            return response, 200
        except Exception as e:
            error_message = {"data": f"Failed to get all users. Cause: {e}."}
            return json.dumps(error_message), 500

    if request.method == "PUT":
        try:
            body = request.json
            body["id"] = user_id
            edit_user(body, connection_string)
            return "", 204
        except Exception as e:
            error_message = {"data": f"Failed to edit user details. Cause: {e}."}
            return json.dumps(error_message), 500

    if request.method == "DELETE":
        try:
            delete_user(id=user_id, connection_string=connection_string)
            return "", 204
        except Exception as e:
            error_message = {"data": f"Failed to delete user details. Cause: {e}."}
            return json.dumps(error_message), 500


app.run(debug=True, port=5607)

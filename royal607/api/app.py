import json

from flask import Flask, request

from royal607.api.repository import insert_user
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
def signup():
    try:
        body = request.json
        user = User.from_dict(body)
        user.email = user.validate_email()
        user.password = user.validate_password()
        insert_user(user, connection_string)
        return 204
    except Exception as e:
        error_message = {"data": f"Failed to create user. Cause: {e}."}
        return json.dumps(error_message), 500


app.run(debug=True, port=5607)
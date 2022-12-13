import datetime

from royal607.api.repository import insert_user, get_user_email_and_password, edit_user_details, delete_user_by_id, \
    delete_user_by_email, get_all_users
from royal607.api.users import User


def signup(request_body, connection_string):
    user = User.from_dict(request_body)
    if user.created_at is None:
        user.created_at = datetime.datetime.utcnow().strftime("%Y-%d-%m %H:%M:%S")
        user.updated_at = user.created_at

    user.email = user.validate_email()
    user.password = user.validate_password()
    if user.password != user.second_password:
        raise ValueError("Password mismatch.")

    insert_user(user, connection_string)


def signin(request_body, connection_string):
    user = User.from_dict(request_body)

    user.email = user.validate_email()
    user.password = user.validate_password()

    existing_user = get_user_email_and_password(user, connection_string)

    if user.password != existing_user.password:
        raise ValueError("Password mismatch.")

    return existing_user


def edit_user(request_body, connection_string):
    user = User.from_dict(request_body)

    if user.email is not None:
        user.email = user.validate_email()

    if user.password is not None:
        user.password = user.validate_password()

    if user.password is not None and user.second_password is not None:
        if user.password != user.second_password:
            raise ValueError("Password mismatch.")

    edit_user_details(user, connection_string)


def delete_user(id=None, email=None, connection_string=None):
    if id is not None:
        user = User(id=id)
        delete_user_by_id(user, connection_string)
        return

    if email is not None:
        user = User(email=email)
        delete_user_by_email(user, connection_string)
        return


def get_all(connection_string):
    users = get_all_users(connection_string)
    return users

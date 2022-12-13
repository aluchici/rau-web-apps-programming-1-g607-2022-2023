# If you don't have sqlite3, please install it using
# pip install sqlite3
# (Optional) SQLAlchemy, Django ORM
import datetime
import sqlite3


from royal607.api.users import User
# Logic
# 1. connect to database
# 2. query (comanda pe care vreau sa o execute software-ul de management al bazei de date)
# 3. create a cursor (obiect cu ajutorul caruia interactionez cu baza de date)
# 4. use cursor to run query
# 5. (optional) process results
# 6. (optional) save result to table (commit)
# 7. (optional) disconnect


def get_all_users(connection_string):
    conn = sqlite3.connect(connection_string)

    query = "select * from users;"

    cursor = conn.cursor()

    try:
        results = cursor.execute(query).fetchall()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e

    users = []
    for user in results:
        current_user = User.from_list(user)
        users.append(current_user)

    return users


def insert_user(user, connection_string):
    conn = sqlite3.connect(connection_string)

    query = f"""
        INSERT INTO users (
                    name, 
                    email, 
                    password, 
                    second_password, 
                    created_at, 
                    updated_at
        )
        VALUES (
            '{user.name}', 
            '{user.email}', 
            '{user.password}', 
            '{user.second_password}', 
            '{user.created_at}', 
            '{user.updated_at}'
        )"""

    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def get_user_email_and_password(user, connection_string):
    conn = sqlite3.connect(connection_string)

    query = f"select id, email, password from users where email = '{user.email}';"

    cursor = conn.cursor()

    try:
        results = cursor.execute(query).fetchone()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e

    existing_user = User.from_list(results)

    return existing_user


def edit_user_details(edited_user, connection_string):
    updated_at = datetime.datetime.utcnow().strftime("%Y-%d-%m %H:%M:%S")
    edited_user.updated_at = updated_at
    user_dict = edited_user.to_dict()

    query = "UPDATE users SET"

    # create string with column_name = value
    # this is used to set the column values
    columns = ""
    for key, value in user_dict.items():
        if key == "id" or value is None:
            continue

        if isinstance(value, str):
            columns = columns + f"{key} = '{value}',"
        else:
            columns = columns + f"{key} = {value},"
    columns = columns[:-1]

    # create string to select which rows to updated
    where_clause = f"WHERE id = '{edited_user.id}'"

    # assemble final query
    query = f"{query} {columns} {where_clause};"

    print(query)

    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def delete_user_by_id(user_to_delete, connection_string):
    query = f"DELETE FROM users WHERE id = '{user_to_delete.id}'"

    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def delete_user_by_email(user_to_delete, connection_string):
    query = f"DELETE FROM users WHERE email = '{user_to_delete.email}'"

    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e
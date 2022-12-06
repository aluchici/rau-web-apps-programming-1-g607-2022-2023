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

    query = "select id, name, email, password, second_password from users;"

    cursor = conn.cursor()

    results = list(cursor.execute(query))

    users = []
    for user in results:
        current_user = User.from_list(user)
        users.append(current_user)

    conn.close()

    return users


def insert_user(user, connection_string):
    conn = sqlite3.connect(connection_string)

    created_at = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S")
    updated_at = created_at

    query = f"""insert into users(name, email, password, second_password, created_at, updated_at)
        values ('{user.name}', '{user.email}', '{user.password}', '{user.second_password}', '{created_at}', 
        '{updated_at}')"""

    cursor = conn.cursor()

    cursor.execute(query)

    conn.commit()

    conn.close()


def get_user_email_and_password(user, connection_string):
    conn = sqlite3.connect(connection_string)

    query = f"select id, email, password from users where email = '{user.email}';"

    cursor = conn.cursor()

    results = list(cursor.execute(query))

    users = []
    for u in results:
        current_user = User(id=u[0], email=u[1], password=u[2])
        users.append(current_user)

    conn.close()

    return users
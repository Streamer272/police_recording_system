"""
app
"""

from flask import Flask, make_response, request
from json import loads
from database_controller import DatabaseController

app = Flask(__name__)


def init_database():
    """
    creates basic database if not exists
    """

    db = DatabaseController("database.sql")
    db.create_table("bills", "speed INT, money INT")
    db.create_table("records", "name TEXT, speed INT, money INT")


@app.route("/")
def mapping_():
    """
    mapping for home page
    :return: nothing
    """

    return make_response(
        "",
        200
    )


@app.route("/get_bills", methods=["POST"])
def mapping_get_money_for_speed():
    """
    mapping for getting money
    """

    data = loads(request.get_data().decode())
    speed = data.get("speed") if data.get("speed") else 50

    db = DatabaseController("database.sql")
    money = 0

    if int(speed) <= 50:
        return make_response(
            "0",
            200,
            {"Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Methods": "GET"}
        )

    if int(speed) - 50 > 60:
        return make_response(
            "DI",
            200,
            {"Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Methods": "GET"}
        )

    # smooth brain code aka r/badcode
    for line in db.get_table("bills"):
        if line[0] >= int(speed) - 50:
            money = line[1]
            break

    return make_response(
        str(money),
        200,
        {"Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Methods": "GET"}
    )


# noinspection PyTypeChecker
@app.route("/add_record", methods=["POST"])
def mapping_add_record():
    """
    mapping for adding records to database
    """

    # TODO: this is basically free sql injection - fix

    data = loads(request.get_data().decode())
    name = data.get("name")
    speed = data.get("speed")
    money = data.get("money")

    if not name or not speed or not money:
        return make_response(
            "Missing data",
            400,
            {"Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Methods": "POST"}
        )

    db = DatabaseController("database.sql")
    db.add_line("records", "name, speed, money", f"\"{name}\", {speed}, {money}")

    return make_response(
        "",
        200,
        {"Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Methods": "POST"}
    )


if __name__ == '__main__':
    app.run(host="0.0.0.0")

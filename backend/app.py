"""
app
"""

from flask import Flask, make_response, request
from flask_cors import CORS
from json import loads, dumps
from os import remove
from database_controller import DatabaseController

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": "*"}})


def reset_database():
    """
    resets basic database
    """

    remove("./database.sql")

    db = DatabaseController("database.sql")
    db.create_table("bills", "speed INT, money INT")
    db.create_table("records", "name TEXT, speed INT, money INT")

    # basic bills (over speed limit : bills you have to pay)
    bills = [(6, 0), (10, 20), (15, 40), (19, 60), (25, 90), (30, 140), (35, 200), (40, 280), (45, 360), (50, 440),
             (55, 540), (60, 650)]

    for bill in bills:
        db.add_line("bills", "speed, money", str(bill[0]) + ", " + str(bill[1]))


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
def mapping_get_bills_for_speed():
    """
    mapping for getting bills
    """

    data = loads(request.get_data().decode())
    speed = data.get("speed") if data.get("speed") else 50

    db = DatabaseController("database.sql")
    # TODO: list index out of range error
    bills = db.get_line("bills", "speed>=" + str(int(speed) - 50))[0][1]

    if int(speed) <= 50:
        return make_response(
            dumps({
                "speed_over_limit": 0,
                "bills": 0
            }),
            200
        )

    if int(speed) - 50 > db.get_table("bills")[-1][1]:
        return make_response(
            dumps({
                "speed_over_limit": 0,
                "bills": 0,
                "removeDI": True
            }),
            200
        )

    return make_response(
        dumps({
            "speed_over_limit": int(speed) - 50,
            "bills": bills
        }),
        200
    )


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
            dumps({
                "state": "missing data"
            }),
            400
        )

    db = DatabaseController("database.sql")
    db.add_line("records", "name, speed, money", f"\"{name}\", {speed}, {money}")

    return make_response(
        dumps({
            "state": "done"
        }),
        200
    )


if __name__ == '__main__':
    if input("Do you want to reset database? [y/n] ") == "y":
        reset_database()

    app.run(host="0.0.0.0")

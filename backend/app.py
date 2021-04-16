"""
app
"""

from flask import Flask, make_response, request
from database_controller import DatabaseController

app = Flask(__name__)


def init_database():
    """
    creates basic database if not exists
    """

    pass


@app.route("/get_money_for_limit?limit=<limit>", methods=["GET"])
def mapping_get_money_for_limit(limit: str):
    """
    mapping for getting money
    :param limit: limit in url
    """

    # TODO: this is basically free sql injection - fix

    db = DatabaseController("database.sql")

    return make_response(
        db.get_line("bills", "limit=" + limit),
        200
    )


@app.route("/add_record", methods=["POST"])
def mapping_add_record():
    """
    mapping for adding records to database
    """

    # TODO: this is basically free sql injection - fix

    data = request.get_data()
    name = data.get("name")
    limit = data.get("limit")
    money = data.get("money")

    if not name or not limit or not money:
        return make_response(
            "Missing data",
            400
        )

    db = DatabaseController("database.sql")
    db.add_line("records", "name, limit, money", f"\"{name}\", \"{limit}\", \"{money}\"")

    return make_response(
        "",
        200
    )


if __name__ == '__main__':
    app.run()

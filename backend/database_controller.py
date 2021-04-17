"""
database controller
inspired by r/badcode on reddit.com
"""

from typing import List, Union
import sqlite3


class DatabaseController:
    """
    database controller class
    """

    def __init__(self, database: str) -> None:
        self.connection = sqlite3.connect(database)
        self.cursor = self.connection.cursor()

    def __del__(self):
        self.close()

    def create_table(self, table_name: str, values: str = "id INT") -> None:
        """
        creates table in database
        :param table_name: name of table you want to create
        :param values: base values in new table
        """

        self.cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({values})")
        self.connection.commit()

    def delete_table(self, table_name: str) -> None:
        """
        deletes table from database
        :param table_name: name of table you want to delete
        """

        self.cursor.execute(f"DROP TABLE {table_name}")
        self.connection.commit()

    def get_table(self, table_name: str) -> List[Union[List]]:
        """
        gets all values from table
        :param table_name: table you want values from
        :return: all values from table
        """

        self.cursor.execute(f"SELECT * FROM {table_name}")
        return self.cursor.fetchall()

    def get_line(self, table_name: str, line_key: str) -> List[Union[List]]:
        """
        gets line from table
        :param table_name: table you want to get line from
        :param line_key: line specifics you want to get line with
        :return: line with line key
        """

        self.cursor.execute(f"SELECT * FROM {table_name} WHERE {line_key}")
        return self.cursor.fetchall()

    def get_value(self, table_name: str, key_to_value: str, key_to_line: str) -> List[Union[List]]:
        """
        gets value from line
        :param table_name: table you want to get value from
        :param key_to_value: specifics of key
        :param key_to_line: line specifics you want to get value with
        :return:
        """

        self.cursor.execute(f"SELECT {key_to_value} FROM {table_name} WHERE {key_to_line}")
        return self.cursor.fetchall()

    def add_line(self, table_name: str, keys: str, values: str) -> None:
        """
        creates new line in specific table
        :param table_name: table you want to create line in
        :param keys: line keys
        :param values: line values
        """

        self.cursor.execute(f"INSERT INTO {table_name} ({keys}) VALUES({values})")
        self.connection.commit()

    def change_line(self, table_name: str, values: str, keys: str) -> None:
        """
        changes line in specific table
        :param table_name: table you want to change line in
        :param values:
        :param keys:
        """

        self.cursor.execute(f"UPDATE {table_name} SET {values} WHERE {keys}")
        self.connection.commit()

    def delete_line(self, table_name: str, key: str) -> None:
        """
        deletes line frm table
        :param table_name: table you want to delete line frm
        :param key: key to line
        """

        self.cursor.execute(f"DELETE FROM {table_name} WHERE {key}")
        self.connection.commit()

    def close(self) -> None:
        """
        closes the database
        """

        self.connection.close()


if __name__ == '__main__':
    pass

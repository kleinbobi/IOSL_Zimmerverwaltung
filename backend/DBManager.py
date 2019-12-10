import mysql.connector


class DBmanager:
    vartest = "hey"
    dbconnnector = ""

    def __init__(self):
        self.dbconnector = mysql.connector.connect(host="localhost", user="root", passwd="M@rian31")

    def lol(self):
        return str(self.dbconnector)

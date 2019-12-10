from flask import Flask
from backend.DBManager import DBmanager

app = Flask(__name__)
dbtest = DBmanager()


@app.route('/', methods=['GET'])
def hello():
    return dbtest.lol()


@app.route('/test', methods=['GET'])
def yeet():
    return "Hoi2"


if __name__ == '__main__':
    app.run()

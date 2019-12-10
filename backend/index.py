from flask import Flask

app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello():
    return "<h1>Hoi</h1>"


@app.route('/test', methods=['GET'])
def yeet():
    return "Hoi2"


if __name__ == '__main__':
    app.run()

import os
from flask import Flask, render_template, session
from flask import request
from backend.DBManager import DBmanager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
personenliste = []
@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')



@app.route('/test', methods=['GET'])
def yeet():
    return "Hoi2"


@app.route('/sendPersonen', methods=['POST'])
def newgast():
    print("OK")
    if request.is_json:
        print(request.is_json)
        json = request.get_json()
        print(json)
# json['name']
    print(json['personen'][0])
    return json

# vorname, nachname, geburtsdatum, geburtsort, email="", tel="", str="", wohnland="",plz=0,hausnummer="",wohnort=""

@app.route('/login', methods=['POST'])
def login():
    """ Logt den Beutzer ein in Session wird ein var auf true gestezt
    """
    json = request.get_json()
    if json['password'] == 'password' and json['username'] == 'admin':
        session['logged_in'] = True #Nachfragen ob Sicher!
        print("eingelogt")
        return '1'
    else:
        return '0'


@app.route("/logout")
def logout():
    session['logged_in'] = False
    return 1

if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    app.run(host='127.0.0.1')

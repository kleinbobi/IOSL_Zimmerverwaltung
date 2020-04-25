import os
from flask import Flask, render_template, session, request
from DBManager import DBmanager
from flask_cors import CORS
from flask_api import status
app = Flask(__name__)
CORS(app)
database = DBmanager()
personenliste = []


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/test', methods=['GET'])
def yeet():
    return "Hoi2", status.HTTP_200_OK


@app.route('/sendPersonen', methods=['POST'])
def sendPersonen():
    """Diese Methode empfängt ein JSON mit den Personen dem Ankfuntfs und abfhartsdatum und mindestens einem Ausweis
    :return: Json wenn erfolgreich, -1 wenn SQL fehlgeschlagen, wenn -2 wenn Authentification nicht in session
    """
    print("OK")
   # if session.get('logged_in'):
    if request.is_json:
        print(request.is_json)
        json = request.get_json()
    return database.savejson(json)
    #else:
        #return '-2'

# vorname, nachname, geburtsdatum, geburtsort, email="", tel="", str="", wohnland="",plz=0,hausnummer="",wohnort=""


@app.route('/login', methods=['POST'])
def login():
    """ Logt den Beutzer ein in Session wird ein var auf true gestezt
        :return 0 wenn erfolgreich -1 wenn nicht
    """
    json = request.get_json()
    if DBmanager.checkuser(json['username'], json['password']):
        session['logged_in'] = True
        print("eingelogt")
        return '0'
    else:
        return '1', status.HTTP


@app.route("/logout", methods=['POST'])#TODO Login richt mit DB
def logout():
    session['logged_in'] = False
    return '1'


@app.route('/getcomuni', methods=['POST'])
def getcomuni():
    """
    Post Request für Authoverfolstädigung der Saten auswahl
    :return: Json Array mit N/backend/static/
ame der Saten [["ALBANIA"], ["ANDORRA"]]
    """
    json = request.get_json()
    res = database.searchcomuni(json)
    return json.dumps(res)


@app.route('/getstati', methods=['POST'])
def getstati():
    """
    Post Request für Authoverfolstädigung der Saten auswahl
    :return: Json Array mit Name der Saten [["ALBANIA"], ["ANDORRA"]]
    """
    json = request.get_json()
    res = database.searchstati(json)
    return json.dumps(res)


@app.route('/getdocumento', methods=['POST'])
def getdocumento():
    """
    Post Request für Authoverfolstädigung der Documente auswahl
    :return: Json Array mit Name der Saten [["asd"], ["adsa"]]
    """
    json = request.get_json()
    res = database.searchdocumento(json)
    return json.dumps(res)


@app.route('/makeBuchung', methods=['POST'])
def makebuchung():
    """

    :return:
    """
    json = request.get_json()
    return '1'


@app.route('/getBuchungen', methods=['POST'])
def getbungungenapi():
    """

    :return:
    """
    ret = []
    json = request.get_json()
   # DBmanager.getbuchungen(json)

    return '1', status.HTTP_200_OK


if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    app.run(host='127.0.0.1', debug=True)

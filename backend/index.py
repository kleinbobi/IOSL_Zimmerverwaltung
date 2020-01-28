from flask import Flask
from flask import request
from backend.DBManager import DBmanager
from backend.Person import Person

app = Flask(__name__)
dbtest = DBmanager()
personenliste = []

@app.route('/', methods=['GET'])
def hello():
    return 0


@app.route('/test', methods=['GET'])
def yeet():
    return "Hoi2"


if __name__ == '__main__':
    app.run()

@app.route("/gast/newgast", methods=['POST'])
def newGast:

#    average_time = request.form.get('average_time')
#   choices = request.form.get('choices')

    forms = request.form

    vorname = request.form.get('vorname')
    nachname = request.form.get('lastname')
    geburtsdatum = request.form.get('')
    geburtsort = request.form.get('')
    


    return 1

#vorname, nachname, geburtsdatum, geburtsort, email="", tel="", str="", wohnland="",plz=0,hausnummer="",wohnort=""

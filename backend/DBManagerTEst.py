from flask import json
from backend.GenerateOutput import generateoutput, daysbetween, strechname
from backend.DBManager import DBmanager
from backend.Person import Person
DB = DBmanager();
#person = Person("Zubi", "Zublasing", "2001-01-09", "Italien", "dominikzubalsing@gmail.com", "+393421890159", "Am Arsch","Welt",39100,"420","GrunzenWEGHAHA")
#personz = Person("Ladi", "Ladurner", "2001-01-09", "Italien", "dominikzubalsing@gmail.com", "+393421890159", "Am Arsch","Welt",39100,"420","GrunzenWEGHAHA")
#personenliste = [person,personz]
#DB.safeGastArray(personenliste);
#DB.searchcomuni()
#print(json.dumps(DB.searchdocumento()))
#generateoutput(DB)
#print(daysbetween("13/02/2020", "18/6/2020"))
#print(strechname("Benjamin",50))
#ret = DB.getstati("italia")
#print(ret[0])
print(strechname("",34))

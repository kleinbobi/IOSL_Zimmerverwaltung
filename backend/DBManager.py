import mysql.connector


class DBmanager:
	vartest = "hey"
	db = ""

	def __init__(self):
		self.db = mysql.connector.connect(host="localhost", user="root", passwd="M@rian31", database="IOSL_Hotel_Verwaltung")

	def lol(self):
		return str(self.dbconnector)

	#Erstellt eine Gruppe für die Buchung
	def creategruppe(self,cursor):
		"""
		Diese Methode Erstellt eine Gruppe für das Abspeichern der Gäste
		:param cursor: DBcursor
		:return: GruppenID
		"""
		cursor.execute("INSERT INTO gruppe(gruppeID) VALUES (NULL)")
		self.db.commit()
		return cursor.lastrowid

	def saveperson(self, cursor, person, ausweis = 'null'):
		cursor.execute("INSERT INTO gast (vorname,nachname,geburtdatum,geburtsort,tel,ausweis,email,wohnland,str,hausnummer,plz,wohnort) VALUES (%s,%s,%s,%s,%s,,%s,%s,%s,%s,%s,%s,%s)", (person['name'], person['surname'], person['birthday'], person['birthplace'], person['tel'], ausweis, person['email'], self.wohnland, self.str, self.hausnummer, self.plz, self.wohnort))
		return cursor.lastrowid

	def savejson(self, json):
		cursor = self.db.cursor()
		#gid = self.createGruppe(cursor)
		print(json['to'])
		print(json['from'])
		for person in json['personen']:
			print(person)

		self.db.commit()
		if cursor.rowcount == 1:
			return json
		else:
			return '-1'

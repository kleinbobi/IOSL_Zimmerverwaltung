import mysql.connector


class DBmanager:
	vartest = "hey"
	db = ""

	def __init__(self):
		try:
			self.db = mysql.connector.connect(host="localhost", user="root", passwd="M@rian31", database="IOSL_Hotel_Verwaltung")
		except mysql.connector.Error as error :
			print("Failed to update record to database rollback: {}".format(error))
			self.db.close()

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
		return cursor.lastrowid

	def saveperson(self, cursor, person, ausweis=None):
		"""
		Diese MEthode speichert eine PErson in den PErsonen Table
		:param cursor: cursor
		:param person: Personen Objekt
		:param ausweis: Ausweis id der in die AusweisTable geschrieben wurde
		:return: id der Person
		"""
		#2 birthplace muss mit wohnort/land ersetzt werden
		cursor.execute("INSERT INTO gast (vorname,nachname,geburtdatum,geburtsort,tel,ausweis,email,wohnland,str,plz,wohnort) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (person['name'], person['surname'], person['birthday'], person['birthplace'], person['tel'], ausweis, person['mail'], person['birthday'], person['adress'], person['plz'], person['place']))
		return cursor.lastrowid

	def savepersongruppe(self, cursor, gid, pidlist):
		for pid in pidlist:
			cursor.execute("INSERT INTO gruppe_gast (gruppeID, gastID) VALUES (%s,%s)", (int(gid), int(pid)))

	def saveausweis(self,cursor,ausweis):
		cursor.execute("INSERT INTO ausweis (ausweis_nr, typ, land) VALUES (%s,%s,%s)", (ausweis['nr'], ausweis['type'], ausweis['country']))
		return cursor.lastrowid

	def savejson(self, json):
		pidlist = []
		try:
			cursor = self.db.cursor()
			gid = self.creategruppe(cursor)
			print(json['to'])
			print(json['from'])
			for person in json['personen']:

				if person['idcardexists'] == 'true':
					print('000000000K')
					pidlist.append(self.saveperson(cursor, person, self.saveausweis(cursor,person['idcard'])))
				else:
					pidlist.append(self.saveperson(cursor, person))
			print(self.savepersongruppe(cursor, gid, pidlist))


			self.db.commit()
			if cursor.rowcount == 1:
				cursor.close()
				return json
			else:
				cursor.close()
				return '-1'
		except mysql.connector.Error as error :
			print("Failed to update record to database rollback: {}".format(error))
			self.db.rollback()
			cursor.close()
			return '-1'

	def searchcomuni(self, json=None):
		"""
		Sucht in der Datanebank nach dem Gemeindan mit dem passenden Namen
		:param json: Teil des Namens der Gemeinde
		:return: Liste mit den Gemeinden
		"""
		cursor = self.db.cursor()
		s = json['search'] + '%'
		cursor.execute("SELECT Descrizione FROM comuni WHERE Descrizione like %s", (s,))
		myresult = cursor.fetchall()
		return myresult

	def searchstati(self, json=None):
		"""
		Sucht in der Datanebank nach dem Gemeindan mit dem passenden Namen
		:param json: Teil des Namens der Gemeinde
		:return: Liste mit den Gemeinden
		"""
		cursor = self.db.cursor()
		#s = json['search'] + '%'
		s = 'A%'
		cursor.execute("SELECT Descrizione FROM stati WHERE Descrizione like %s", (s,))
		myresult = cursor.fetchall()
		return myresult

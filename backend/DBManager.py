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
		self.db.commit()
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

	def savepersongruppe(self,cursor,gid,pidlist):
		for pid in pidlist:
			cursor.execute("INSERT INTO gruppe_gast (gruppeID, gastID) VALUES (%s,%s)", (int(gid), int(pid)))


	def savejson(self, json):
		pidlist = []

		cursor = self.db.cursor()
		gid = self.creategruppe(cursor)
		print(json['to'])
		print(json['from'])
		for person in json['personen']:
			pidlist.append(self.saveperson(cursor, person))
		print(self.savepersongruppe(cursor, gid, pidlist))
		
		self.db.rollback()
		#self.db.commit()
		if cursor.rowcount == 1:
			#self.db.rollback()
			return json
		else:
			return '-1'

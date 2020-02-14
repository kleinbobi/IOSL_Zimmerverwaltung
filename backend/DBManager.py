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

################################################################################################

	def creategruppe(self, cursor, json):
		"""
		Diese Methode Erstellt eine Gruppe für das Abspeichern der Gäste
		:param json: Das json das den name enthält alloggiato
		:param cursor: DBcursor
		:return: GruppenID
		"""
		s = 1
		if json['alloggiato'] == 'CAPO GRRUPPO':
			s = 0
		cursor.execute("INSERT INTO gruppe(gruppeID, familie) VALUES (NULL , %s)", (s,))
		return cursor.lastrowid

	def saveperson(self, cursor, person, ausweis=None):
		"""
		Diese MEthode speichert eine PErson in den PErsonen Table
		:param cursor: cursor
		:param person: Personen Objekt
		:param ausweis: Ausweis id der in die AusweisTable geschrieben wurde
		:return: id der Person
		"""
		cursor.execute("INSERT INTO gast (vorname,nachname,geburtdatum,geburtsort,tel,ausweis,email,wohnland,str,plz,wohnort, gender, geburtsortIT) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (person['name'], person['surname'], person['birthday'], person['birthplace'], person['tel'], ausweis, person['mail'], person['location'], person['address'], person['plz'], person['place'], person['gender'], person['birthPlaceIt']))
		return cursor.lastrowid

	def savepersongruppe(self, cursor, gid, pidlist):
		for pid in pidlist:
			cursor.execute("INSERT INTO gruppe_gast (gruppeID, gastID) VALUES (%s,%s)", (int(gid), int(pid)))

	def saveausweis(self, cursor, ausweis):
		cursor.execute("INSERT INTO ausweis (ausweis_nr, typ, land) VALUES (%s,%s,%s)", (ausweis['nr'], ausweis['type'], ausweis['country']))
		return cursor.lastrowid

	def createbuchung(self, cursor, json):
		"""
		erstellt eine Buchung in der Buchungstabelle mit dem ankunftsdatum (from) dem enddatum (to) und dem Name (name)
		:param cursor: cursor
		:param json: json
		:return: bid die ID der Buchung
		"""
		if 'name' in json:
			s = json['name']
		else:
			s = ''

		cursor.execute("INSERT INTO buchung (ankunft, abfahrt, name) VALUES (%s,%s,%s)", (json['from'], json['to'], s))
		bid = cursor.lastrowid
		for z in json['zimmerNr']:
			cursor.execute("INSERT INTO buchung_zimmer (buchungid , zimmerID) VALUES (%s, %s)", (bid, z))
		return bid

	def safegruppebuchung(self, cursor, gid, bid):
		"""
		Speichert in den Table buchung_gruppe die beiden einzigen Paramater gid und bid die die beide Fremdschlüssel sind
		:param cursor: cursor
		:param gid: gruppen ID
		:param bid: buchung ID
		"""
		cursor.execute("INSERT INTO buchung_gruppe (buchung, gruppe) VALUES (%s,%s)", (gid, bid))

	def savejson(self, json):
		"""
		Die Hauptmethode für das Speichern einer Person von hier aus werden alle anderen Methoden aufgerufen
		:param json: Das Json mit den Informationen zur Buchung
		:return:
		"""
		pidlist = []

		cursor = self.db.cursor()
		gid = self.creategruppe(cursor, json)
		print(json['to'])
		print(json['from'])
		for person in json['personen']:
			if person['idcard'] is None:
				pidlist.append(self.saveperson(cursor, person))
			else:
				self.saveausweis(cursor, person['idcard'])
				pidlist.append(self.saveperson(cursor, person, person['idcard']['nr']))
		self.savepersongruppe(cursor, gid, pidlist)
		bid = self.createbuchung(cursor, json)
		self.safegruppebuchung(cursor, gid, bid)
		self.db.commit()
		if cursor.rowcount == 1:
			cursor.close()
			return json
		else:
			cursor.close()
			return '-1'
		#todo add try catch again

####################################################################

	def searchcomuni(self, json):
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

	def searchstati(self, json):
		"""
		Sucht in der Datanebank nach dem Staten mit dem passenden Namen
		:param json: Teil des Namens der Staten
		:return: Liste mit den Staten
		"""
		cursor = self.db.cursor()
		s = json['search'] + '%'
		cursor.execute("SELECT Descrizione FROM stati WHERE Descrizione like %s", (s,))
		myresult = cursor.fetchall()
		return myresult

	def searchdocumento(self, json):
		"""
		Sucht in der Datanebank nach den Documenten mit dem passenden Namen
		:param json: Teil des Namens der Staten
		:return: Liste mit den Staten
		"""
		cursor = self.db.cursor()
		s = json['search'] + '%'
		cursor.execute("SELECT Descrizione FROM documento WHERE Descrizione like %s", (s,))
		myresult = cursor.fetchall()
		return myresult

	def searchalloggiato(self, json):
		"""
		Sucht in der Datanebank nach dem Alloggati mit dem passenden Namen
		:param json: Teil des Namens der Staten
		:return: Liste mit den Staten
		"""
		cursor = self.db.cursor()
		s = json['search'] + '%'
		cursor.execute("SELECT Descrizione FROM alloggiato WHERE Descrizione like %s", (s,))
		myresult = cursor.fetchall()
		return myresult

#########################################################################

	def getgruppenfürout(self):
		cursor = self.db.cursor()
		cursor.execute('SELECT * FROM gruppe WHERE gesendet IS FALSE')
		return cursor.fetchall()

	def getpersonenfürout(self, gid):
		cursor = self.db.cursor()
		cursor.execute('SELECT gast.* FROM gast, gruppe_gast WHERE gruppeID = %s AND gruppe_gast.gastID = gast.id', (gid,))
		return cursor.fetchall()

	def getbuchungfürout(self, gid):
		cursor = self.db.cursor()
		cursor.execute('SELECT buchung.* FROM buchung, buchung_gruppe WHERE gruppe = %s AND buchung = buchungid', (gid,))
		return cursor.fetchall()

	def getcomuni(self, name):
		cursor = self.db.cursor()
		cursor.execute('SELECT * FROM comuni WHERE Descrizione = %s', (name,))
		return cursor.fetchall()

	def getstati(self, name):
		cursor = self.db.cursor()
		cursor.execute('SELECT * FROM stati WHERE Descrizione = %s', (name,))
		return cursor.fetchall()

	def getdocumento(self, name):
		cursor = self.db.cursor()
		cursor.execute('SELECT * FROM documento WHERE Descrizione = %s', (name,))
		return cursor.fetchall()

	def getausweis(self, nr):
		cursor = self.db.cursor()
		cursor.execute('SELECT * FROM ausweis WHERE ausweis_nr = %s', (nr,))
		return cursor.fetchall()

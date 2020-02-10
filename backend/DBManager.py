import mysql.connector


class DBmanager:
	vartest = "hey"
	db = ""

	def __init__(self):
		self.db = mysql.connector.connect(host="localhost", user="root", passwd="M@rian31", database="IOSL_Hotel_Verwaltung")

	def lol(self):
		return str(self.dbconnector)

	def safecostemer(self, vorname, nachname, geburtsdatum,):

		cursor = self.db.cursor()
		cursor.execute("INSERT INTO gast (vorname, nachname) VALUES (%s,%s)", (vorname, nachname))
		self.db.commit()
		if cursor.rowcount == 1:
			return 1
		else:
			return 2

	def safeGastArray(self, gastlist=[]):
		cursor = self.db.cursor()

		gid = self.createGruppe(cursor)

		print(gid)

		for gast in gastlist:
			gast.sqlstatment(cursor, 0)

		self.db.commit()
		if cursor.rowcount == 1:
			return 1
		else:
			return 2
	#Erstellt eine Gruppe für die Buchung
	def createGruppe(self,cursor):
		cursor.execute("INSERT INTO gruppe(gruppeID) VALUES (NULL)")
		self.db.commit()
		return cursor.lastrowid

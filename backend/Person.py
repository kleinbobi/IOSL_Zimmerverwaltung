class Person:
	vorname = ""
	nachname = ""
	geburtsdatum = ""
	geburtsort = ""
	email = ""
	tel = ""
	ausweisid = -1
	str = ""
	wohnland = ""
	plz = 0
	hausnummer = ""
	wohnort=""

	def __init__(self, vorname, nachname, geburtsdatum, geburtsort, email="", tel="", str="", wohnland="",plz=0,hausnummer="",wohnort=""):
		self.vorname = vorname
		self.nachname = nachname
		self.geburtsdatum = geburtsdatum
		self.geburtsort = geburtsort
		self.email = email
		self.tel = tel
		self.str = str
		self.wohnland = wohnland
		self.plz = plz
		self.hausnummer = hausnummer
		self.wohnort = wohnort

	def sqlstatment(self, cursor, buchungNr):
		cursor.execute("INSERT INTO gast (vorname,nachname,geburtdatum,geburtsort,tel,buchungNr,email,wohnland,str,hausnummer,plz,wohnort) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (self.vorname, self.nachname, self.geburtsdatum, self.geburtsort, self.tel,buchungNr, self.email, self.wohnland,self.str, self.hausnummer, self.plz, self.wohnort))

	def serialize(self):
		return {
			'vorname': self.vorname,
			'nachname': self.nachname,
		}

class Person:
	vorname = None
	nachname = None
	geburtsdatum = None
	geburtsort = None
	email = None
	tel = None
	ausweisid = None
	str = None
	wohnland = None
	plz = None
	wohnort = None
	ausweisobject = None
	geschlecht = None
	geburtsortIT = None

	def __init__(self, vorname, nachname, geburtsdatum, geburtsort, email=None, tel=None, str=None, wohnland=None, plz=None, wohnort=None, geschlecht = None, geburtsortIT = None):
		self.vorname = vorname
		self.nachname = nachname
		self.geburtsdatum = geburtsdatum
		self.geburtsort = geburtsort
		self.email = email
		self.tel = tel
		self.str = str
		self.wohnland = wohnland
		self.plz = plz
		self.geschlecht = geschlecht
		self.wohnort = wohnort
		self.geburtsortIT = geburtsortIT


	def sqlstatment(self, cursor, buchungNr):#solte nicht hier sein sondern in DBMannager
		cursor.execute("INSERT INTO gast (vorname,nachname,geburtdatum,geburtsort,tel,buchungNr,email,wohnland,str,hausnummer,plz,wohnort) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (self.vorname, self.nachname, self.geburtsdatum, self.geburtsort, self.tel,buchungNr, self.email, self.wohnland,self.str, self.hausnummer, self.plz, self.wohnort))

	def setausweis(self, ausweis):
		self.ausweisobject = ausweis

	def serialize(self):
		return {
			"name": self.vorname,
			"surname": self.nachname,
			"gender": self.geschlecht,
			"birthday": self.geburtsdatum,
			"birthplace": self.geburtsort,
			"birthplaceIt": self.geburtsortIT,
			"location": self.wohnland,
			"tel": self.tel,
			"mail": self.email,
			"address": self.str,
			"plz": self.plz,
			"place": self.wohnort,
			"idcard": self.checkausweis()
		}

	def checkausweis(self):
		if self.ausweisobject is None:
			return None
		else:
			self.ausweisobject.serialize

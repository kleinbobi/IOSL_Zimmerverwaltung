from backend import DBManager
from backend.IDCard import IDCard
from backend.Person import Person


class BuchungReturn:
	"""
	Das Objekt wierd verwendet um beim Zurücgeben der Bcungen ein JSON erzeugen zu können
	"""
	id = None
	fronn = None# from is reservated
	to = None
	zimmerNr = []
	alloggiato = None
	personen = []
	personenjson = []

	def setgruppe(self, grupequery):
		if grupequery[1] == 0:
			self.alloggiato = "CAPO GRRUPPO"
		else:
			self.alloggiato = "CAPO FAMIGLIA"

	def setbuchung(self, buchungquery):
		self.id = buchungquery[0]
		self.fronn = buchungquery[1]
		self.to = buchungquery[2]

	def setZimmer(self, zimmer):
		for z in zimmer:
			self.zimmerNr.append(z[0])


	def setpersonen(self, personen, db):#könnet mit einer Factory oder(begrif vergessen) so besser sein

		for ausweisp in personen:
			print(ausweisp[6])
			if ausweisp[6] is not None:
				p = Person(ausweisp[1], ausweisp[2], ausweisp[3], ausweisp[4], ausweisp[7], ausweisp[5], ausweisp[9], ausweisp[8], ausweisp[10], ausweisp[11], ausweisp[12], ausweisp[13] )
				id = DBManager.DBmanager.getausweis(db, ausweisp[6])
				p.setausweis(IDCard(id[0][0], id[0][1], id[0][2]))
				self.personen.append(p)
			else:
				self.personen.append(Person(ausweisp[1], ausweisp[2], ausweisp[3], ausweisp[4], ausweisp[7], ausweisp[5], ausweisp[9], ausweisp[8], ausweisp[10], ausweisp[11], ausweisp[12], ausweisp[13] ))
		self.personenjson = self.createperlist()
	def createperlist(self):
		ret = []
		for p in self.personen:
			ret.append(p.serialize())
		return ret

	def serialize(self):
		return {
			"id": self.id,
			"from": self.fronn,
			"to": self.to,
			"zimmerNr": self.zimmerNr,
			"alloggiato": self.alloggiato,
			"personen": self.createperlist()
		}

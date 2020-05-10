class IDCard:
	ausweisNr = -1
	typ = ""
	land = ""

	def __init__(self, ausweisNr,typ,land):
		self.ausweisNr = ausweisNr
		self.land = land
		self.typ

	def serialize(self):
		return {
			"nr": str(self.ausweisNr),
			"country": self.land,
			"type": self.typ
		}

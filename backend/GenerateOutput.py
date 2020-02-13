from datetime import datetime

def generateoutput(dbmanager):
	dagobert = ""
	ret = dbmanager.getgruppenfürout()
	for gr in ret:
		bu = dbmanager.getbuchungfürout(gr[0])# Buchung die Zur gruppe gehört
		pl = dbmanager.getpersonenfürout('7')#gr[0] #list der Personen in Gruppe
		for x in pl: # c person in personenliste
			if x[6] is None:
				if gr[1] == 1:
					dagobert += '19'
				else:
					dagobert += '20'
			else:
				if len(pl) == 1:
					dagobert += '16'
				elif gr[1] == 1:
					dagobert += '17'
				else:
					dagobert += '18'

			dagobert += bu[1]# muss im format dd/mm/yyyy
			dagobert += dagobert(bu[1], bu[2])
			dagobert += strechname(x[2], 50)#nachname
			dagobert += strechname(x[1], 30)#vorname

			if x[12] == 'f':#Geschlecht
				dagobert += '2'
			else:
				dagobert += '1'

			dagobert += x[3]



def daysbetween(von, bis):
	"""
	Die Methode berechnet den Zeitraum zwischen zwei Daten
	:param von: Von
	:param bis: Bis
	:return: Abstand der Tage als str wenn < 10 wird vorne eine 0 angehängt
	"""
	date_format = "%d/%m/%Y"
	a = datetime.strptime(von, date_format)
	b = datetime.strptime(bis, date_format)
	delta = b - a
	if int(delta.days) < 10:
		return "0" + str(delta.days)
	else:
		return str(delta.days)


def strechname(ln, to):
	"""
	Streckt eingebenen String auf die Angebene Länge
	:param ln: string
	:param to: zu Streckende Länge
	:return: gestrechten String
	"""
	ret = ln
	for i in range(len(ln)+1, to+1):
		ret += " "
	return ret

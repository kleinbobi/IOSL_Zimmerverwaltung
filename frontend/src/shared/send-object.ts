import { Person } from './person';

export class SendObject {
    from: string;
    to: string;
    zimmerNr: string[];
    alloggiato: string;
    ausweisperson: Person;
    personen: Person[];

    valid() {
        // TODO: besser mochn use forin
        if (!this.from || !this.to || !this.zimmerNr || !this.personen) {
            return false;
        }

        // FIXME: zimmer.len, personen.len usw

        return true;
    }
}

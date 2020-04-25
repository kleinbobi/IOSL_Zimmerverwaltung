import { Person } from './person';

export class SendObject {
    from: string;
    to: string;
    zimmerNr: string[];
    alloggiato: string;
    personen: Person[];

    valid() {
        if (!this.from || !this.to || !this.zimmerNr || !this.alloggiato || !this.personen) {
            return false;
        }

        if (this.zimmerNr.length == 0 || this.personen.length == 0) {
            return false;
        }

        return true;
    }
}

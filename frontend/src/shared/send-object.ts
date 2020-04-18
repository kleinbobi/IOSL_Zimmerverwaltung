import { Person } from './person';

export class SendObject {
    error: string;

    from: string;
    to: string;
    zimmerNr: string[];
    alloggiato: string;
    personen: Person[];

    valid() {
        //TODO: error message
        if (!this.from || !this.to || !this.zimmerNr || !this.alloggiato || !this.personen) {
            this.error = 'Something is missing';
            return false;
        }

        if (this.zimmerNr.length == 0 || this.personen.length == 0) {
            this.error = 'Zimmer oder Personen are missing';
            return false;
        }

        this.error = null;
        return true;
    }
}

export class Person {
    name: string;
    surname: string;
    gender: string;
    birthday: string;
    birthplace: string;
    birthPlaceIt: string;
    location: string;
    tel: number;
    mail: string;
    address: string;
    plz: number;
    place: string;

    idcard = {};

    constructor() { }

    valid(hasAusweis) {
        if (this.name && this.surname) {
            if (hasAusweis) {
                if (this.idcard['nr'] && this.idcard['country'])
                    return true;
                else
                    return false;
            }
            // need null and not {}
            this.idcard = null;
            return true;
        }
        return false;
    }
}
export class Person {
    name: string;
    surname: string;
    gender: string;
    birthday: Date | string;
    birthplace: string;
    birthplaceIt: string;
    location: string;
    tel: number;
    mail: string;
    address: string;
    plz: number;
    place: string;

    idcard = {};

    constructor() { }

    valid(hasAusweis) {

        if (this.name && this.surname && this.gender && this.birthday && this.birthplace
             && this.birthplaceIt && this.location && this.tel && this.mail && this.address
             && this.plz && this.place) {
            if (hasAusweis) {
                if (this.idcard['nr'] && this.idcard['country'] && this.idcard['type'])
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
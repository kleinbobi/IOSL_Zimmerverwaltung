export class Person {
    name: string;
    surname: string;
    gender: string;
    birthdate: Date;
    birthplace: string;
    location: string;
    tel: string;
    mail: string;
    address: string;
    plz: string;
    place: string;

    idnr: string;
    idcountry: string;
    idtype: string;

    getPersonenObj() {
        let id = null;
        if (this.idnr && this.idcountry && this.idtype) {
            id = {
                nr: this.idnr,
                country: this.idcountry,
                type: this.idtype
            };
        }

        let person = {
            name: this.name,
            surname: this.surname,
            gender: this.gender,
            birthday: this.birthdate,
            birthplace: this.birthplace,
            location: this.location,
            tel: this.tel,
            mail: this.mail,
            address: this.address,
            plz: this.plz,
            place: this.place,

            idcard: id
        };

        return person;
    }
}

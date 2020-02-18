import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-singleperson',
  templateUrl: './singleperson.component.html',
  styleUrls: ['./singleperson.component.sass']
})
export class SinglepersonComponent implements OnInit {

  @Input() showIdInput = false;

  name: string;
  surname: string;
  gender: string;
  birthday: Date;
  birthplace: string;
  birthPlaceIt: string;
  location: string;
  tel: string;
  mail: string;
  address: string;
  plz: string;
  place: string;

  nr: string;
  country: string;
  type: string;

  constructor() { }

  ngOnInit() {
  }

  outputObject() {
    let id = null;
    if (this.showIdInput) {
      id = {
        nr: this.nr,
        country: this.country,
        type: this.type
      };  
    }

    let person = {
      name: this.name,
      surname: this.surname,
      gender: this.gender,
      birthday: this.formatSqlDate(this.birthday),
      birthplace: this.birthplace,
      location: this.location,
      tel: this.tel,
      mail: this.mail,
      address: this.address,
      plz: this.plz,
      place: this.place,

      idcard: id
    };

    console.log(person);

    //TODO output obj
  }

  formatSqlDate(date: Date): string {
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') +  m + '/' + date.getFullYear();
  }
}

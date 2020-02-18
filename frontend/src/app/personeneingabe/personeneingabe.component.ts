import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-personeneingabe',
  templateUrl: './personeneingabe.component.html',
  styleUrls: ['./personeneingabe.component.sass']
})
export class PersoneneingabeComponent implements OnInit {

  an;
  ab;
  alloggiato: string;
  zimmer = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.zimmer.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(z: string): void {
    const index = this.zimmer.indexOf(z);

    if (index >= 0) {
      this.zimmer.splice(index, 1);
    }
  }


  sendobj = {
    from: "10/02/2020",
    to: "12/02/2020",
    zimmerNr: ["30", "21"],
    alloggiato: "CAPO GRRUPPO",
    personen: [
        {
          name: "Paul",
          surname: "Prünster",
          gender: "m",
          birthday: "11/03/2020",
          birthplace: "Italia",
          birthPlaceIt: null,
          location: "Italien",
          tel: "3801513777",
          mail: "paul.pruenster@gmai.com",
          address: "Botengasse 17/A",
          plz: "39050",
          place: "Jenesien",

          idcard: {
              nr: "AX4248086",
              country: "IT",
              type: "IDENT"
          }
      },
      {
          name: "Aaron",
          surname: "Wilhalm",
          gender: "m",
          birthday: "11/03/2020",
          birthplace: "Italia",
          birthPlaceIt: null,
          location: "Italien",
          tel: "3801513777",
          mail: "paul.pruenster@gmai.com",
          address: "Botengasse 17/A",
          plz: "39050",
          place: "Jenesien",

          idcard: null
      }
    ]
  }

  constructor(private api: ApiconnectorService) {}

  ngOnInit() {

  }

  sendPost() {
    let postobj = {
      from: this.formatSqlDate(this.ab),
      to: this.formatSqlDate(this.an),
      zimmerNr: this.zimmer,
      alloggiato: this.alloggiato,
      personen: []
    }
    
    console.log(postobj);
    
    this.api.sendPost('http://127.0.0.1:5000/sendPersonen', this.sendobj).subscribe(data => console.log(data));
  }

  formatSqlDate(date: Date): string {
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') +  m + '/' + date.getFullYear();
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-personeneingabe',
  templateUrl: './personeneingabe.component.html',
  styleUrls: ['./personeneingabe.component.sass']
})
export class PersoneneingabeComponent implements OnInit {

  an = new Date();
  ab = new Date();
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
    from: "2020-02-10",
    to: "2020-02-12",
    zimmerNr: ["30", "21"],
    alloggiato: "CAPO GRRUPPO",
    personen: [
        {
          name: "Paul",
          surname: "Prünster",
          gender: "m",
          birthday: "2001-03-11",
          birthplace: "Italia",
          location: "Italien",
          tel: "3801513777",
          mail: "paul.pruenster@gmai.com",
          adress: "Botengasse 17/A",
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
          birthday: "2001-03-11",
          birthplace: "Italia",
          location: "Italien",
          tel: "3801513777",
          mail: "paul.pruenster@gmai.com",
          adress: "Botengasse 17/A",
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
    console.log('sent the post');
    
    console.log(this.formatSqlDate(this.an));
    console.log(this.formatSqlDate(this.ab));
    console.log(this.alloggiato);
    console.log(this.zimmer);
    

    // this.api.sendPost('http://127.0.0.1:5000/sendPersonen', this.sendobj).subscribe(data => console.log(data));
  }

  formatSqlDate(d: Date): string {
    let month = (d.getMonth() + 1);
    return d.getFullYear() + '-' + (month < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + d.getDate();
  }

}

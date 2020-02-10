import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';

@Component({
  selector: 'app-personeneingabe',
  templateUrl: './personeneingabe.component.html',
  styleUrls: ['./personeneingabe.component.sass']
})
export class PersoneneingabeComponent implements OnInit {

  sendobj = {
    from: "2020-02-10",
    to: "2020-02-12",
    personen: [
        {
            name: "Paul",
            surname: "Prünster",
            gender: "m",
            birthday: "2001-03-11",
            birthplace: "Italy",
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
            birthplace: "Italy",
            tel: "3801513777",
            mail: "paul.pruenster@gmai.com",
            adress: "Botengasse 17/A",
            plz: "39050",
            place: "Jenesien",

            idcard: null
        },
        {
            name: "Dominik",
            surname: "Zublasing",
            gender: "m",
            birthday: "2001-03-11",
            birthplace: "Italy",
            tel: "3801513777",
            mail: "paul.pruenster@gmai.com",
            adress: "Botengasse 17/A",
            plz: "39050",
            place: "Jenesien",

            idcard: null
        }
    ]
};

  constructor(private api: ApiconnectorService) { }

  ngOnInit() {
  }

  sendPost() {
    console.log('sent the post');
    this.api.sendPost('http://127.0.0.1:5000/sendPersonen', this.sendobj).subscribe(data => console.log(data));
  }

}

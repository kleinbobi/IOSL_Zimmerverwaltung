import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buchungenanzeige',
  templateUrl: './buchungenanzeige.component.html',
  styleUrls: ['./buchungenanzeige.component.sass']
})
export class BuchungenanzeigeComponent implements OnInit {

  reterror: string;
  buchungen ;/* = [
    {
      id: null,
      from: "10/02/2020",
      to: "12/02/2020",
      zimmerNr: [
        "30",
        "21"
      ],
      alloggiato: "CAPO GRUPPO",
      personen: [
        {
          name: "Aaron",
          surname: "Wilhalm",
          gender: "m",
          birthday: "11/03/2020",
          birthplace: "Germania",
          birthplaceIt: "null",
          location: "Italien",
          tel: "3801513777",
          mail: "paul.pruenster@gmai.com",
          address: "Botengasse 17/A",
          plz: "39050",
          place: "Jenesien",
          idcard: null
        },
        {
          name: "Paul",
          surname: "Prünster",
          gender: "m",
          birthday: "11/03/2020",
          birthplace: null,
          birthplaceIt: "Bolzano",
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
        }
      ]
    },
    {
      id: null,
      from: "10/02/2020",
      to: "12/02/2020",
      zimmerNr: [
        "30",
        "21"
      ],
      alloggiato: "CAPO GRUPPO",
      personen: [
        {
          name: "Aaron",
          surname: "Wilhalm",
          gender: "w",
          birthday: "11/03/2020",
          birthplace: "Germania",
          birthplaceIt: null,
          location: "Italien",
          tel: "3801513777",
          mail: "paul.pruenster@gmai.com",
          address: "Botengasse 17/A",
          plz: "39050",
          place: "Jenesien",
          idcard: null
        },
        {
          name: "Paul",
          surname: "Prünster",
          gender: "w",
          birthday: "11/03/2020",
          birthplace: null,
          birthplaceIt: "Bolzano",
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
        }
      ]
    }
  ];*/

  constructor(private acs: ApiconnectorService, private router: Router) { }

  ngOnInit() {
    this.acs.getBuchungen(null, null).subscribe(data => {
      this.buchungen = data;
    }, err => this.reterror = err);
  }

  bearbeiten(idx: number) {
    this.router.navigateByUrl('personeneingabe', { state: this.buchungen[idx] });
  }

}

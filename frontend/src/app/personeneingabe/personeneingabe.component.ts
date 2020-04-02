import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { MatChipInputEvent } from '@angular/material';
import { SendObject } from 'src/shared/send-object';
import { Person } from 'src/shared/person';

@Component({
  selector: 'app-personeneingabe',
  templateUrl: './personeneingabe.component.html',
  styleUrls: ['./personeneingabe.component.sass']
})
export class PersoneneingabeComponent implements OnInit {

  sendObj = new SendObject();
  an;
  ab;
  alloggiato: string;
  zimmer = [];
  personen = [];

  test = new Person();

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if (!this.sendObj.zimmerNr)
        this.sendObj.zimmerNr = [];

      this.sendObj.zimmerNr.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(z: string): void {
    const index = this.sendObj.zimmerNr.indexOf(z);

    if (index >= 0) {
      this.sendObj.zimmerNr.splice(index, 1);
    }

    if (this.sendObj.zimmerNr.length === 0) {
      delete this.sendObj.zimmerNr;
    }
  }

  updatePersonen(update) {
    if (!this.sendObj.personen)
      this.sendObj.personen = [];
    this.sendObj.personen = update;
  }

  constructor(private api: ApiconnectorService) {}

  ngOnInit() {

  }

  sendPost() {
    // let postobj = {
    //   from: this.formatSqlDate(this.ab),
    //   to: this.formatSqlDate(this.an),
    //   zimmerNr: this.zimmer,
    //   alloggiato: this.alloggiato,
    //   personen: this.personen
    // }
    
    console.log(this.sendObj);

    // TODO: validate the shit out of sendobj
    // TODO: format dates to sqldates with the menthod
    
    //this.api.sendPost('http://127.0.0.1:5000/sendPersonen', this.sendobj).subscribe(data => console.log(data));
  }

  formatSqlDate(date: Date): string {
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') +  m + '/' + date.getFullYear();
  }
}

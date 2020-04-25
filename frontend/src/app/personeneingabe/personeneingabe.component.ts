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
  reterror: any;
  sendObj = new SendObject();

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

    let pers = [];
    for (const i in update)
      if (update.hasOwnProperty(i))
        pers.push(update[i]);

    if (pers.length != 0)
      this.sendObj.personen = pers;
    else
      delete this.sendObj.personen;
  }

  constructor(private api: ApiconnectorService) { }

  ngOnInit() {

  }

  sendPost() {
    if (this.sendObj.valid()) {

      let clone = (obj) => {
        let obj2 = Object.create(obj);
        for (let k in obj) {
          if (obj[k] instanceof Date) {
            obj2[k] = this.formatSqlDate(obj[k]);
          } else {
            obj2[k] = (obj[k] != null &&  typeof obj[k] === 'object') ? clone(obj[k]) : obj[k];
          }
        }
        return obj2;
      }

      let msg = clone(this.sendObj);
      this.reterror = null;

      for (const i in msg) {
        if (msg[i] instanceof Date)
          msg[i] = this.formatSqlDate(msg[i]);
      }

      msg.personen.forEach(p => {
        p.birthday = this.formatSqlDate(p.birthday)
      });

      console.log(msg);
      this.api.sendPost('http://127.0.0.1:5000/sendPersonen', msg).subscribe(data => console.log(data), err => this.reterror = err);
    }

  }

  formatSqlDate(date: Date | string): string {    
    if (date instanceof Date) {
      let m = date.getMonth() + 1;
      let d = date.getDate();

      return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') + m + '/' + date.getFullYear();
    }
    return date;
  }
}

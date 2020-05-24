import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { MatChipInputEvent } from '@angular/material';
import { SendObject } from 'src/shared/send-object';
import { Router } from '@angular/router';

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

    if (update.length != 0)
      this.sendObj.personen = update;
    else
      delete this.sendObj.personen;
  }

  constructor(private api: ApiconnectorService, private router: Router) { }

  ngOnInit() {
    delete history.state.navigationId;
    for (const i in history.state) {
      this.sendObj[i] = history.state[i];
    }

    this.sendObj.from = this.fromSqlToDate(this.sendObj.from);
    this.sendObj.to = this.fromSqlToDate(this.sendObj.to);

    if (this.sendObj.personen) {
      this.sendObj.personen.forEach(p => {
        p.birthday = this.fromSqlToDate(p.birthday);
      });
    }
  }

  sendPost() {
    if (this.sendObj.valid()) {

      let msg = this.clone(this.sendObj);
      this.reterror = null;

      for (const i in msg) {
        if (msg[i] instanceof Date)
          msg[i] = this.formatSqlDate(msg[i]);
      }

      msg.personen.forEach(p => {
        p.birthday = this.formatSqlDate(p.birthday)
      });

      if (!msg.id) {
        msg.id = null;
        this.api.sendBuchung(msg).subscribe(data => console.log(data), err => this.reterror = err);
      } else {
        this.api.updateBuchung(msg).subscribe(data => console.log(data), err => this.reterror = err);
      }

      console.log(msg);
      this.router.navigate(['']);
    }

  }

  clone(obj) {
    if (obj instanceof Object) {
      let obj2 = Object.create(obj);
      for (let k in obj) {
        if (obj[k] instanceof Date) {
          obj2[k] = this.formatSqlDate(obj[k]);
        } else if (obj[k] instanceof Array) {
          obj2[k] = [];

          obj[k].forEach(o => {
            obj2[k].push(this.clone(o));
          });
        } else {
          obj2[k] = (obj[k] && typeof obj[k] === 'object') ? this.clone(obj[k]) : obj[k];
        }
      }
      return obj2;
    }
    return obj;
  }

  fromSqlToDate(str: string | Date) {
    if (str && typeof str === 'string') {
      let parts = str.split('/');
      let mydate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

      return mydate;
    }
    return str;
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

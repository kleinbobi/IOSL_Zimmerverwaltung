import { Component, OnInit } from '@angular/core';
import { Buchung } from 'src/shared/buchung';
import { MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservierung',
  templateUrl: './reservierung.component.html',
  styleUrls: ['./reservierung.component.sass']
})
export class ReservierungComponent implements OnInit {

  sendObj = new Buchung();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  send() {
    if (this.valid()) {
      this.sendObj.from = this.formatSqlDate(this.sendObj.from);
      this.sendObj.to = this.formatSqlDate(this.sendObj.to);

      console.log(this.sendObj);

      this.router.navigate(['']);
    }
  }

  valid() {
    if (!this.sendObj.from || !this.sendObj.to || !this.sendObj.name || !this.sendObj.zimmerNr)
     return false;

    if (this.sendObj.zimmerNr.length === 0)
      return false;

    return true;
  }
  formatSqlDate(date: Date | string): string {
    if (date instanceof Date) {
      let m = date.getMonth() + 1;
      let d = date.getDate();

      return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') + m + '/' + date.getFullYear();
    }
    return date;
  }

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

}

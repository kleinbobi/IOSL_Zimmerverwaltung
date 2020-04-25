import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/shared/person';

@Component({
  selector: 'app-dropdownperson',
  templateUrl: './dropdownperson.component.html',
  styleUrls: ['./dropdownperson.component.sass']
})
export class DropdownpersonComponent implements OnInit {
  @Input() person: Person;

  constructor() { }

  ngOnInit() {
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

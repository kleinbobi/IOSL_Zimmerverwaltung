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

}

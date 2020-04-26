import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Person } from '../../shared/person';

@Component({
  selector: 'app-personenliste',
  templateUrl: './personenliste.component.html',
  styleUrls: ['./personenliste.component.sass']
})
export class PersonenlisteComponent {
  @Output() personenChange = new EventEmitter();

  austypes = [
    'IDENT',
    'TEST'
  ];

  ausweis = true;
  currentPerson = new Person();
  
  @Input() personen: Person[] = [];

  editmode = false;
  addPerson() {
    if (this.currentPerson.valid(this.ausweis)) {
      if (!this.editmode) {
        this.personen.push(this.currentPerson);
      } else {
        this.editmode = false;
      }

      // emit changes
      this.personenChange.emit(this.personen);
      this.currentPerson = new Person();
      this.ausweis = false;

      this.resetValidations();
    }
  }

  editPerson(id: number) {
    this.currentPerson = this.personen[id];
    this.ausweis = (this.currentPerson.idcard) ? true : false;

    this.editmode = true;
  }

  removePerson(id: number) {
    this.personen.splice(id, 1);
    this.personenChange.emit(this.personen);
  }

  resetValidations() {
    setTimeout(() => {
      let list = document.getElementsByClassName('removeV');
      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove('mat-form-field-invalid')
      }
    }, 0); // what (une geats net)
  }
}

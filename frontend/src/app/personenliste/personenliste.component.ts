import { Component, Output, EventEmitter } from '@angular/core';
import { Person } from '../../shared/person';

@Component({
  selector: 'app-personenliste',
  templateUrl: './personenliste.component.html',
  styleUrls: ['./personenliste.component.sass']
})
export class PersonenlisteComponent {
  @Output() personenChange = new EventEmitter();

  austypes = [ // TODO: get from api?
    'IDENT',
    'TEST'
  ];

  ausweis = true;
  currentPerson = new Person();
  personen: { [key: number]: Person } = {};

  editmode = false;
  id_counter = 0;
  addPerson() {
    if (this.currentPerson.valid(this.ausweis)) {
      if (!this.editmode) {
        // Person an id_counter stelle schreiben und hochzählen
        this.personen[this.id_counter++] = this.currentPerson;
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

  removePerson(id: string) {
    delete this.personen[id];
  }

  resetValidations() {
    setTimeout(() => {
      let list = document.getElementsByTagName('mat-form-field');
      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove('mat-form-field-invalid')
      }
    }, 0); // what (une geats net)
  }
}

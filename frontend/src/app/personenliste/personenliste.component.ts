import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Person } from '../../shared/person';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personenliste',
  templateUrl: './personenliste.component.html',
  styleUrls: ['./personenliste.component.sass']
})
export class PersonenlisteComponent implements OnInit {
  @Output() personenChange = new EventEmitter();
  @Input() personen: Person[] = [];

  austypes = [
    'IDENT',
    'TEST'
  ];

  personenForm: FormGroup;
  
  ausweis = true;
  editmode = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.personen) // set personen if nothing passed in
      this.personen = [];

    this.personenForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      gender: ['m', [Validators.required]],
      birthday: [null, [Validators.required]],
      birthplace: [null, [Validators.required]],
      birthplaceIt: [null, [Validators.required]],
      location: [null, []],
      tel: [null, [Validators.pattern('^[0-9]*$')]],
      mail: [null, []],
      address: [null, []],
      plz: [null, [Validators.pattern('^[0-9]*$')]],
      place: [null, []],

      idcard: this.fb.group({
        nr: [null, [Validators.required]],
        country: [null, [Validators.required]],
        type: [null, [Validators.required]]
      })
    });

    
    this.personenForm.valueChanges.subscribe(val => {
      // val.birthplace ? this.birthplaceIt.disable() : this.birthplaceIt.enable()
      // val.birthplaceIt ? this.birthplace.disable() : this.birthplace.enable()
      // validation disabeling
    })
  }
  get bp() {
    return this.personenForm.get('birthplace') as FormControl;
  }
  get bpi() {
    return this.personenForm.get('birthplaceIt') as FormControl;
  }


  
  addPerson() {
    if (this.personenForm.valid) {
      let val = this.personenForm.value;

      if (!this.ausweis)
        val.idcard = null;

      if (this.editmode == null) {
        this.personen.push(val);
      } else {
        this.personen[this.editmode] = val;
        this.editmode = null;
      }

      // emit changes
      this.personenChange.emit(this.personen);

      this.personenForm.reset();

      this.ausweis = false;
      this.changeValidations();
    }
  }

  editPerson(id: number) {
    this.editmode = id;
    let editperson = this.personen[id];

    this.ausweis = editperson.idcard == null ? false : true;
    this.changeValidations();

    if (!editperson.idcard)
      editperson.idcard = {
        nr: null,
        country: null,
        type: null,
      };
    this.personenForm.setValue(editperson);
  }

  removePerson(id: number) {
    this.personen.splice(id, 1);
    this.personenChange.emit(this.personen);
  }

  changeValidations() {
    if (this.ausweis) {
      this.personenForm.get('idcard').get('nr').setValidators([Validators.required]);
      this.personenForm.get('idcard').get('country').setValidators([Validators.required]);
      this.personenForm.get('idcard').get('type').setValidators([Validators.required]);
    } else {
      this.personenForm.get('idcard').get('nr').clearValidators();
      this.personenForm.get('idcard').get('country').clearValidators();
      this.personenForm.get('idcard').get('type').clearValidators();
    }
    this.personenForm.get('idcard').get('nr').updateValueAndValidity();
    this.personenForm.get('idcard').get('country').updateValueAndValidity();
    this.personenForm.get('idcard').get('type').updateValueAndValidity();
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, MatNativeDateModule, MatIconModule, MAT_DATE_LOCALE } from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

import { LoginComponent } from './login/login.component';
import { PersoneneingabeComponent } from './personeneingabe/personeneingabe.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PersonenlisteComponent } from './personenliste/personenliste.component';
import { DropdownpersonComponent } from './dropdownperson/dropdownperson.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersoneneingabeComponent,
    PersonenlisteComponent,
    DropdownpersonComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,

    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatExpansionModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

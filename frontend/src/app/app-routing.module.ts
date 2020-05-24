import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersoneneingabeComponent } from './personeneingabe/personeneingabe.component';
import { BuchungenanzeigeComponent } from './buchungenanzeige/buchungenanzeige.component';
import { ReservierungComponent } from './reservierung/reservierung.component';


const routes: Routes = [
  {path: '', component: BuchungenanzeigeComponent},
  {path: 'personeneingabe', component: PersoneneingabeComponent},
  {path: 'reservierung', component: ReservierungComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

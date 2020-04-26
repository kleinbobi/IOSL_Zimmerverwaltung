import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersoneneingabeComponent } from './personeneingabe/personeneingabe.component';
import { BuchungenanzeigeComponent } from './buchungenanzeige/buchungenanzeige.component';


const routes: Routes = [
  {path: '', component: BuchungenanzeigeComponent},
  {path: 'personeneingabe', component: PersoneneingabeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

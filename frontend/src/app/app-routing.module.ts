import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersoneneingabeComponent } from './personeneingabe/personeneingabe.component';


const routes: Routes = [
  // {path: '', component: LoginComponent},
  {path: 'personeneingabe', component: PersoneneingabeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

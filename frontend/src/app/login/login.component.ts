import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loggedin = false;

  formuser: string;
  formpass: string;

  constructor(private api: ApiconnectorService) { }

  ngOnInit() {
  }

  login() {
    if (!this.formuser || !this.formpass)
      return;

    let creds = {
      username: this.formuser,
      password: this.formpass
    };

    this.formuser = '';
    this.formpass = '';

    this.api.sendPost('http://127.0.0.1:5000/login', creds).subscribe(data => {
      if (data === 1) {
        console.log('you are now logged in'); // TODO do the routing stuff
        this.loggedin = true;
      } else {
        console.log('Wrong pass or user');
      }
    });
  }

  logout() {
    this.api.sendPost('http://127.0.0.1:5000/logout', {}).subscribe(data => {
        console.log('you are now logged out'); // TODO do the routing stuff
        this.loggedin = false;
    });
  }

}

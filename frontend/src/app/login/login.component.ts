import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loggedin = false;

  showString: string;

  formuser: string;
  formpass: string;

  constructor(private api: ApiconnectorService, private router: Router) { }

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

    this.api.login(creds).subscribe(data => {
      if (data === 0) {
        console.log('you are now logged in'); // TODO do the routing stuff
        this.showString = '';
        this.loggedin = true;

        this.router.navigate(['personeneingabe']); // Login
      } else {
        this.showString = 'Wrong password or username';
      }
    }, e => {
      this.showString = 'Server is down or Cors'
    });
  }

  logout() {
    this.api.logout({}).subscribe(data => {
        console.log('you are now logged out'); // TODO do the routing stuff
        this.loggedin = false;

        this.router.navigate(['']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

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

    this.api.sendPost('http://127.0.0.1:5000/login', creds).subscribe(data => console.log(data));
  }

  logout() {
    this.api.sendPost('http://127.0.0.1:5000/logout', {}).subscribe(data => console.log(data));
  }

}

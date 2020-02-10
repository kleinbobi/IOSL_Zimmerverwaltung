import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiconnectorService) { }

  creds = {
    username: 'admin',
    password: 'password'
  };

  ngOnInit() {
  }

  login() {
    this.api.sendPost('http://127.0.0.1:5000/login', this.creds).subscribe(data => console.log(data));
  }

}

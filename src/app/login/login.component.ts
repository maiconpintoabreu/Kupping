import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : Login;
  constructor(private router: Router){//private loginService : LoginService) {
    this.login = new Login();
  }

  ngOnInit() {

  }
  loginSubmit() {
    //create login method
    console.log(this.login);
    this.router.navigate(["/admin/"]);
    //this.loginService.loginSubmit(this.login).subscribe();
  }

}

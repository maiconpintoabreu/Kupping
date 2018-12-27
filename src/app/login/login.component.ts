import { Component, OnInit, HostBinding } from '@angular/core';
import { Login } from '../model/login';
import { Routes, Router } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ slideInDownAnimation ]

})
export class LoginComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  login : Login;
  constructor(private router: Router,private auth:AuthService){
    this.login = new Login();
  }

  ngOnInit() {

  }
  loginSubmit() {
    //create login method
    console.log(this.login);
    this.auth.login(this.login);
    //this.router.navigate(["/admin/"]);
    //this.loginService.loginSubmit(this.login).subscribe();
  }

}

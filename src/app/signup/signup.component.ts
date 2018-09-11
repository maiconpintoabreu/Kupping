import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [ slideInDownAnimation ]

})
export class SignupComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  signup : User;
  constructor(private router: Router, private userService : UserService) {
    this.signup = new User();
  }

  ngOnInit() {

  }
  signupSubmit() {
    //create signup method
    console.log(this.signup);
    this.userService.addUser(this.signup).subscribe(res=>{
      this.router.navigate(["/admin/"]);
    },err=>{
      console.log(err);
    });
  }

}

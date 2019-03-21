import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [ slideInDownAnimation ]

})
export class SignupComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  signup : User;
  constructor(private router: Router, private userService : UserService,
    private authenticationService: AuthenticationService) {
    this.signup = new User();
  }

  ngOnInit() {

  }
  signupSubmit() {
    //create signup method

    this.authenticationService.signup(this.signup)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(["/admin/"]);
            },
            error => {
              console.log(error);
                // this.error = error;
                // this.loading = false;
            });
  }

}

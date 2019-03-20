import { Component, OnInit, HostBinding } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { AuthenticationService } from '../services/auth/auth.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ slideInDownAnimation ]

})
export class LoginComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  loginForm: FormGroup;
  submitted: Boolean;
  returnUrl: string;
  loading = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,private router: Router,private authenticationService:AuthenticationService){
  }
  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(!this.returnUrl.startsWith("/admin")){
      this.returnUrl = "/admin";
    }
  }
  loginSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              console.log(this.returnUrl);
              this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}
  
  // {
  //   //create login method
  //   console.log(this.login);
  //   this.auth.login(this.login);
  //   //this.router.navigate(["/admin/"]);
  //   //this.loginService.loginSubmit(this.login).subscribe();
  // }

}

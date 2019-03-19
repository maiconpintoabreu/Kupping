import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Login } from "src/app/model/login";
import { Auth } from "./auth";

@Injectable()
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;


  constructor(public router: Router, private auth: Auth) {
    this._idToken = "";
    this._accessToken = "";
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(credentials: Login): void {
    this.auth.login(credentials);
  }

  public handleAuthentication(): void {
    this.auth.parseHash(null).subscribe(
      authResult => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.router.navigate(["/admin"]);
        }
      },
      err => {
        if (err) {
          this.router.navigate(["/home"]);
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      }
    );
  }

  private setSession(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");
    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewSession(): void {
    this.auth.checkSession({}).subscribe(
      authResult => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        }
      },
      err => {
        if (err) {
          alert(
            `Could not get a new token (${err.error}: ${err.errorDescription}).`
          );
          this.logout();
        }
      }
    );
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = "";
    this._idToken = "";
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }
}

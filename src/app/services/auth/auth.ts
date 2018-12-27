import { Injectable } from "@angular/core";
import { Login } from "src/app/model/login";
import { Observable } from "rxjs";
import { AuthResults } from "src/app/model/authResult";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private  URL:string = environment.backend+"private/auth/";
    authVariables = {
      clientID: environment.AuthConfig.clientID,
      domain: environment.AuthConfig.domain,
      responseType: "token id_token",
      redirectUri: environment.AuthConfig.callbackURL
    };
    constructor(private http: HttpClient) { }
    login(credential : Login) : Observable<AuthResults>{
        let headers = new HttpHeaders();
        //var token = this.authService.getToken();
        //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.post<AuthResults>(this.URL+"/login",credential, httpOptions);
    }

    parseHash(hash: string) : Observable<AuthResults>{
        let headers = new HttpHeaders();
        //var token = this.authService.getToken();
        //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.post<AuthResults>(this.URL+"/parseHash",hash, httpOptions);
    }
    checkSession(session: any) : Observable<AuthResults>{
        let headers = new HttpHeaders();
        //var token = this.authService.getToken();
        //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.post<AuthResults>(this.URL+"/checkSession",session, httpOptions);
    }
}
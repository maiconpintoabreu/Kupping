import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DanceClass } from '../model/danceclass';

@Injectable({
  providedIn: 'root'
})
export class DanceClassService {

  private  URL:string = "http://maiconspas.ddns.net/rest/danceclass";
  constructor(private http: HttpClient) { }
  
  getDanceClasses() : Observable<DanceClass[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceClass[]>(this.URL, httpOptions);
}
}

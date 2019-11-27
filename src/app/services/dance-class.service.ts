import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../model/event';
import {environment} from '../../environments/environment';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class DanceClassPublicService {

  private  URL:string = environment.backend+"public/event";
  constructor(private http: HttpClient) { }
  
  getDanceClasses() : Observable<Event[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<Event[]>(this.URL, httpOptions);
  }
  getDanceClass(id: string) : Observable<Event>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<Event>(this.URL+"/"+id, httpOptions);
  }
  booking(id: string, model: Booking) : Observable<String>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.post<String>(this.URL+"/"+id+"/booking",model, httpOptions);
  } 
}

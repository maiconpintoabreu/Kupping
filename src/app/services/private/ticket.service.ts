import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from '../../model/student';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private  URL:string = environment.backend+"private/danceclass/";
  private  URLAUTOCOMPLETE:string = environment.backend+"private/";
  constructor(private http: HttpClient) { }
  
  sendTicket(id:string, models:number[]) : Observable<Response>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.post<Response>(this.URL+id+"/ticket/send",models, httpOptions);
  }
}

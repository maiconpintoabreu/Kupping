import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DanceClass } from '../../model/danceclass';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanceClassService {

  private  URL:string = environment.backend+"private/danceclass";
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
  addDanceClass(model:DanceClass) : Observable<DanceClass>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.post<DanceClass>(this.URL,model, httpOptions);
  }
  updateDanceClass(model:DanceClass) : Observable<DanceClass>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.put<DanceClass>(this.URL+"/"+model.id,model, httpOptions);
  }
  deleteDanceClass(id:string) : Observable<Object>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.delete(this.URL+"/"+id, httpOptions);
  }
  getDanceClass(id: string) : Observable<DanceClass>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceClass>(this.URL+"/"+id, httpOptions);
  }
}

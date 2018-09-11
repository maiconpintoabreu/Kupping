import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  URL:string = "/rest/public/user";
  constructor(private http: HttpClient) { }
  
  addUser(model:User) : Observable<User>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.post<User>(this.URL,model, httpOptions);
  }
}

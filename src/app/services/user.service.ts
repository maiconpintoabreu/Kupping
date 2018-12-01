import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  URL:string = environment.backend+"public/user";
  constructor(private http: HttpClient) { }
  
  addUser(model:User) : Observable<User>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.post<User>(this.URL,model, httpOptions);
  }
}

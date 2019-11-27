import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../../model/event';
import { environment } from '../../../environments/environment';
import { Style } from 'src/app/model/style';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  private  URL:string = environment.backend+"private/style";
  constructor(private http: HttpClient) { }
  
  getStyles() : Observable<Style[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<Style[]>(this.URL, httpOptions);
  }
}

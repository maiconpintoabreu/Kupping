import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Style } from '../model/style';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StylePublicService {

  private  URL:string = environment.backend+"public/style";
  constructor(private http: HttpClient) { }
  
  getStyles() : Observable<Style[]>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.get<Style[]>(this.URL, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(data: any): Observable<any> {
    return this.httpClient.post(baseUrl, data);
  }
}

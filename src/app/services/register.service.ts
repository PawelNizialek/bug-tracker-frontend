import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../models/user';

const baseUrl = 'http://localhost:8080/api/v1/auth/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}

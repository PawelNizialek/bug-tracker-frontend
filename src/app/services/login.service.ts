import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private getUrl = 'http://localhost:8080/signin';

  constructor(private httpClient: HttpClient) { }

  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.getUrl, user);
  }
}

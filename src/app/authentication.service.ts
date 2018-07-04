import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  user: User;
  getLogin() {
    return this.http.get('api/users/login');
  }

  getSignup() {
    return this.http.get('api/users/signup');
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import { User } from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  submitForm(data) {
    this.http.post('/api/users/login', {
      name: data.name,
      email: data.email,
      password: data.password
    }).subscribe((user: User) => {
      this.globals.current_user = user;
      console.log('After login: ', user);

      this.router.navigate(['/dashboard']);

    }, (err) => {
      console.log(err.error);
    });
  }}

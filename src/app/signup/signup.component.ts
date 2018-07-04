import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import { User } from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  submitForm(data) {
     this.http.post('/api/users/signup', {
        name: data.name,
        email: data.email,
        password: data.password
     }).subscribe((user: User) => {
       this.globals.current_user = user;
       console.log('After signup: ', user);

       this.router.navigate(['/dashboard']);

       }, (err) => {
          console.log(err.error);
     });
  }
}

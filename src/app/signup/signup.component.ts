import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import { User } from '../user';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private http: HttpClient, private globals: Globals, private router: Router, private fb: FormBuilder) {
    this.signupForm = fb.group({
      name: [''],
      contact: [''],
      college: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      address: [''],
    });
  }

  ngOnInit() {
  }

  submitForm(data) {
     this.http.post('/api/users/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
        college: data.college,
        contact: data.contact
     }).subscribe((user: User) => {
       this.globals.current_user = user;
       console.log('After signup: ', user);

       const userObj = { 'id': user.id, 'name': user.name };
       localStorage.setItem('userObject', JSON.stringify(userObj));

       this.router.navigate(['/dashboard']);

       }, (err) => {
          console.log(err.error);
     });
  }
}

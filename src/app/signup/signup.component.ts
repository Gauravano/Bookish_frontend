import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import { User } from '../user';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private http: HttpClient, private globals: Globals, private router: Router, private fb: FormBuilder,
              private toastr: ToastrService) {
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
       this.toastr.success( 'You are successfully signed up!', `Welcome ${user.name} !`);
       const userObj = { 'id': user.id, 'name': user.name };
       localStorage.setItem('userObject', JSON.stringify(userObj));

       this.router.navigate(['/dashboard']);

       }, (err) => {
          console.log(err.message);
          this.toastr.error(err.message);
     });
  }
}

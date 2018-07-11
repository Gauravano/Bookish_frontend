import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import { User } from '../user';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private http: HttpClient, private globals: Globals, private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private auth: AuthenticationService) {
    this.loginForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {
  }

  submitForm(data) {
    console.log('dd', data);
    this.http.post('/api/users/login', {
      name: data.name,
      email: data.email,
      password: data.password
    }).subscribe((user: User) => {
      this.globals.current_user = user;
      console.log('After login: ', user);

      const userObj = { 'id': user.id, 'name': user.name };
      localStorage.setItem('userObject', JSON.stringify(userObj));

      this.router.navigate(['/dashboard']);
      this.toastr.success( `Hope you find your desired book :) `, `Welcome ${user.name} !`, {
        timeOut: 30000
      });

      window.location.reload ();
    }, (err) => {
      console.log(err.error);
      this.toastr.warning('Please enter valid Email ID and Password.' , 'Invalid Credentials!');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from './globals';
import { User } from './user';
import {Router} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private http: HttpClient, private globals: Globals, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    const retrievedObject = localStorage.getItem('userObject');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
  }

  logOut() {
    this.http.post('/api/users/logout', {}).subscribe((message) => {
      console.log('After logout: ', message);
      localStorage.removeItem('userObject');
      this.router.navigate(['/dashboard']);

    }, (err) => {
      console.log(err.error);
    });
  }

  logIn() {
    this.auth.getLogin().subscribe((data) => {
      console.log('data', data);
    },
      (err) => {
        if (err.status === 200) {
          this.router.navigate(['/login']);
        } else {
          console.log(err.error);
        }
      });
  }

  signUp() {
    this.auth.getSignup().subscribe((data) => {
        console.log('data', data);
      },
      (err) => {
        if (err.status === 200) {
          this.router.navigate(['/signup']);
        } else {
          console.log(err.error);
        }
      });
  }

  newListing() {
    this.router.navigate(['/listings/add']);
  }
}


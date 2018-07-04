import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from './globals';
import { User } from './user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.http.post('/api/users/logout', {}).subscribe((message) => {

      console.log('After logout: ', message);

      // this.router.navigate(['/dashboard']);

    }, (err) => {
      console.log(err.error);
    });
  }
}


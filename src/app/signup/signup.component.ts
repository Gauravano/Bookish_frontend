import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  current_user = undefined;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitForm(data) {
     this.http.post('/api/users/signup', {
        name: data.name,
        email: data.email,
        password: data.password
     }).subscribe((user) => {
       this.current_user = user;
       console.log(user);
     });
  }
}

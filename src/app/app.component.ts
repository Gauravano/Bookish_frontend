import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Globals} from './globals';
import { User } from './user';
import {Router} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {WishlistService} from './wishlist.service';
import {Listing} from './Listing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  wishlist_count;
  current_user = localStorage.getItem('userObject');
  constructor(private http: HttpClient, private globals: Globals, private router: Router, private auth: AuthenticationService,
              private toastr: ToastrService, private wishlistService: WishlistService) { }

  ngOnInit() {
    console.log('App compo called');
    const retrievedObject = localStorage.getItem('userObject');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    this.current_user = retrievedObject;
    this.wishlistService.getWishlist().subscribe((data: Listing[]) => {
      this.wishlist_count = data.length;
    });
  }


  logOut() {
    this.http.post('/api/users/logout', {}).subscribe((message) => {
      console.log('After logout: ', message);
      localStorage.removeItem('userObject');
      this.toastr.success('Successfully logged out');
      this.router.navigate(['/dashboard']);
      window.location.reload();
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
          console.log(err);
          this.toastr.warning(err.error.message);
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
          console.log(err);
          this.toastr.warning(err.error.message);
        }
      });
  }

  newListing() {
    this.router.navigate(['/listings/add']);
  }

}


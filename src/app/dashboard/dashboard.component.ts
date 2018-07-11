import {Component, OnChanges, OnInit} from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../Listing';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { SimpleChanges } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listings: Listing[] = [];
  filterForm: FormGroup;
  current_user = localStorage.getItem('userObject');
  wishlist: Listing[] = [];

  constructor(private listingService: ListingService,
              private router: Router,
              private wishlistService: WishlistService,  private fb: FormBuilder,
              private toastr: ToastrService) {
      this.filterForm = fb.group({
        price: [''],
        author_name: [''],
        book_name: [''],
        condition: ['']
      });

    this.filterForm.valueChanges.subscribe(data => {
      this.submitFilterForm(data);
    });
  }

  ngOnInit() {
    this.listingService.getListings().subscribe((listings: Listing[]) => {
      console.log(listings);
      this.listings =  listings;
    });

    this.current_user = localStorage.getItem('userObject');
    if (this.current_user != null) {
      this.wishlistService.getWishlist().subscribe((data: Listing[]) => {
        this.wishlist = data;
      }, (err) => {
        console.log(err);
      });
    }
  }

  submitFilterForm(data) {
    console.log('daaa', data);
    if (data.condition === 'All') {
      data.condition = '';
    }

    if (data.price === 1) {
      data.price = 100000;
    }

    this.listingService.getFilteredList(data).subscribe((items: Listing[]) => {
        console.log(items);
        this.listings = items;
    }, (err) => {
        console.log(err);
    });
  }

  showListing(id) {
    console.log('Show listing init: ', id);
    this.router.navigate([`/listings/${id}`]);
  }

  changeWishlist(id, event) {

    this.wishlistService.getWishlist().subscribe((data: Listing[]) => {
      this.wishlist = data;
    }, (err) => {
      console.log(err);
    });

    console.log('event', event.path[1]);
    console.log('status check', this.checkInWishlist(id));

    if (this.checkInWishlist(id) === true) {
      this.removeFromWishlist(id);
      event.path[1].title = 'Add to wishlist';
      event.path[0].style.color = '#212529';
      $('#heartCount')[0].children[0].innerText = this.wishlist.length - 1;
    } else {
      this.wishlistService.addWishlistItem(id).subscribe((data) => {
        console.log('wishList item', data);
        event.path[1].title = 'Already in wishlist';
        event.path[0].style.color = 'red';
        this.toastr.success('Item added to the wishlist');
        $('#heartCount')[0].children[0].innerText = this.wishlist.length + 1;
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      });
    }

  }

  checkInWishlist(id) {

    for (let i of this.wishlist) {
      if (i.id === id) {
        return true;
      }
    }
    return false;
  }

  removeFromWishlist(id) {
    this.wishlistService.deleteWishlistItem(id).subscribe((item) => {
      console.log('removed', item);
      this.toastr.success('Listing removed from your wishlist');
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
  }

}





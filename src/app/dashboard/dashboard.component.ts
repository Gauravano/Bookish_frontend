import {Component, OnChanges, OnInit} from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../Listing';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  listings: Listing[] = [];
  filterForm: FormGroup;
  current_user = localStorage.getItem('userObject');

  constructor(private listingService: ListingService,
              private router: Router,
              private wishlistService: WishlistService,  private fb: FormBuilder) {
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

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.filterForm);
  }

  submitFilterForm(data) {
    if (data.condition === 'All') {
      data.condition = '';
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

  addWishlist(id) {
    this.wishlistService.addWishlistItem(id).subscribe((data) => {
      console.log('wishList item', data);
    }, (err) => {
        console.log(err);
    });
  }


}





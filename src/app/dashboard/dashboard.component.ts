import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../Listing';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listings: Listing[] = [];
  constructor(private listingService: ListingService,
              private router: Router,
              private wishlistService: WishlistService) { }
  ngOnInit() {
    this.listingService.getListings().subscribe((listings: Listing[]) => {
      console.log(listings);
      this.listings =  listings;
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

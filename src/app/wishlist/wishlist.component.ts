import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import {Listing} from '../Listing';
import {ListingService} from '../listing.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Listing[] = [];
  constructor(private wishlistService: WishlistService, private listingService: ListingService) { }

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe((listings: Listing[]) => {
      console.log(listings);
      this.wishlist =  listings;
    }, (err) => {
      console.log(err);
    });
  }

  deleteWishlistItem(id) {
    this.wishlistService.deleteWishlistItem(id).subscribe((item) => {
      console.log(item);
    }, (err) => {
      console.log(err);
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import {Listing} from '../Listing';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Listing[] = [];
  constructor(private wishlistService: WishlistService) { }

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe((listings: Listing[]) => {
      console.log(listings);
      this.wishlist =  listings;
    });
  }

}


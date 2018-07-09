import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import {Listing} from '../Listing';
import {ListingService} from '../listing.service';
import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Listing[] = [];
  constructor(private wishlistService: WishlistService,
              private listingService: ListingService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe((listings: Listing[]) => {
      console.log(listings);
      this.wishlist =  listings;
    }, (err) => {
      console.log(err);
    });
  }

  deleteWishlistItem(id, event) {
    this.wishlistService.deleteWishlistItem(id).subscribe((item) => {
      console.log(item);
      event.path[2].remove();
      $('#heartCount')[0].children[0].innerText = this.wishlist.length - 1;
      this.toastr.success('Book removed from wishlist');
    }, (err) => {
      console.log(err);
      this.toastr.warning(err.error.message);
    });
  }

}


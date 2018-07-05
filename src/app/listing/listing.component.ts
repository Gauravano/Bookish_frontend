import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ListingService } from '../listing.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Listing} from '../Listing';
import {WishlistService} from '../wishlist.service';
import {MessageService} from '../message.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id = +this.route.snapshot.paramMap.get('id');
  listing: Listing;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private listingService: ListingService,
              private wishlistService: WishlistService,
              private messageService: MessageService,
              private http: HttpClient) { }

  ngOnInit() {
    this.getListing();
  }

  getListing() {
    this.listingService.getListing(this.id).subscribe((data: Listing) => {
      console.log('Listing: ', data);
      this.listing = data;
    }, (err) => {
      console.log(err);
    });
  }

  addWishlist(id) {
    this.wishlistService.addWishlistItem(id).subscribe((data) => {
      console.log('wishList item', data);
    }, (err) => {
      console.log(err);
    });
  }

  getMessages() {
    console.log('Fetching messages!', this.id);

    this.messageService.fetchMessages(this.id).subscribe((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  }

  sendMessage(data) {
    this.messageService.sendMessage(data.message, this.listing.id).subscribe((message) => {
      console.log(message);

      $('#contactForm').prepend(`<div style='background-color: dodgerblue; padding: 4px;'>${data.message}</div>`);

    }, (err) => {
      console.log(err);
    });

  }
}

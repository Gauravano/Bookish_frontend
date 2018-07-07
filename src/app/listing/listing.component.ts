import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ListingService } from '../listing.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Listing} from '../Listing';
import {WishlistService} from '../wishlist.service';
import {MessageService} from '../message.service';
import * as $ from 'jquery';
import { Message } from '../message';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id = +this.route.snapshot.paramMap.get('id');
  listing: Listing;
  showMessage  = false;
  conversation: Message[];
  current_user = localStorage.getItem('userObject');

  constructor(private route: ActivatedRoute,
              private location: Location,
              private listingService: ListingService,
              private wishlistService: WishlistService,
              private messageService: MessageService,
              private http: HttpClient) {

  }

  ngOnInit() {
    this.getListing();
    this.getMessages();

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

    this.messageService.fetchMessages(this.id).subscribe((data: Message[]) => {
        console.log('conversation', data);
        this.conversation = data;
        if (this.conversation.length > 0) {
          this.showMessage = true;
        }
      }, (err) => {
        console.log(err);
      });
  }

  sendMessage(data) {
    console.log('Inside', data);
    this.messageService.sendMessage(data.message, this.listing.id).subscribe((message) => {
      console.log(message);

      $('#point').prepend(`<div class='row'><div style='width: 400px; border-radius: 25px;
 border-top-left-radius: 0px; background-color: lightgoldenrodyellow;
 padding: 10px; margin-bottom: 10px;'>${data.message}</div></div>`);

    }, (err) => {
      console.log(err);
    });

  }
}

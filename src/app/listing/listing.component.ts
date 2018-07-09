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
import {ToastrService} from 'ngx-toastr';

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
  wishlist;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private listingService: ListingService,
              private wishlistService: WishlistService,
              private messageService: MessageService,
              private http: HttpClient,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.current_user = localStorage.getItem('userObject');
    this.getListing();
    this.getMessages();
    this.getWishlist();
  }

  getWishlist() {
    this.wishlistService.getWishlist().subscribe((data: Listing[]) => {
      this.wishlist = data;
    }, (err) => {
      console.log(err);
    });
  }

  getListing() {
    this.listingService.getListing(this.id).subscribe((data: Listing) => {
      console.log('Listing: ', data);
      this.listing = data;
    }, (err) => {
      console.log(err);
    });
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
      $('#heartCount')[0].children[0].innerText = this.wishlist.length - 1;
    } else {
      this.addWishlist(id);
      this.toastr.success('Item added to the wishlist');
      $('#heartCount')[0].children[0].innerText = this.wishlist.length + 1;
    }

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

    if (this.checkOwner() === true) {
      this.toastr.warning('You can\'t message yourself');
      return false;
    }

    this.messageService.sendMessage(data.message, this.listing.id).subscribe((message) => {
      console.log(message);
      this.toastr.success('Message Sent');

      $('#messageSet').append(`<div class='row'><div style='width: 400px; border-radius: 25px;
 border-top-left-radius: 0px; background-color: lightgoldenrodyellow;
 padding: 10px; margin-bottom: 10px;'>${data.message}</div></div>`);

      $('#message').val('');
      
    }, (err) => {
      console.log(err);
    });
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
      // $('#heartCount')[0].children[0].innerText = this.wishlist.length - 1;
      this.getWishlist();
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
  }

  checkOwner() {
    console.log('result', this.current_user != null && (JSON.parse(this.current_user).name === this.listing.user_name));
    if (this.current_user != null && (JSON.parse(this.current_user).id === this.listing.userId)) {
      return true;
    } else {
      return false;
    }
  }
}

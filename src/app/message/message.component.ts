import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import {Listing} from '../Listing';
import {WishlistService} from '../wishlist.service';
import {MessageService} from '../message.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  myListItems: Listing[];
  constructor(private listingService: ListingService,
              private wishlistService: WishlistService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getUserSpecificListings();
  }

  getMessages(id) {
    this.messageService.fetchMessages(id).subscribe((data) => {
      console.log(data);
      // this.organizeData(data);
    }, (err) => {
      console.log(err);
    });
  }

  getUserSpecificListings() {
    this.listingService.getListItems().subscribe((myItems: Listing[]) => {
      this.myListItems = myItems;
    }, (err) => {
      console.log(err);
    });
  }

}



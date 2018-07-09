import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import {Listing} from '../Listing';
import {WishlistService} from '../wishlist.service';
import {MessageService} from '../message.service';
import * as $ from 'jquery';
import {MessageSet} from '../message-set';
import {AuthenticationService} from '../authentication.service';
import {User} from '../user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  myListItems: Listing[];
  messageSets: MessageSet[] = [];

  constructor(private listingService: ListingService,
              private wishlistService: WishlistService,
              private messageService: MessageService,
              private authService: AuthenticationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserSpecificListings();
    this.toastr.info( 'Please click on the listing to see messages related to it. Thanks!', ' ' , {
      disableTimeOut: true,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }

  getMessages(id) {
    this.messageService.fetchMessages(id).subscribe((data) => {
      console.log(data);
      this.organizeData(data);
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

  organizeData(data) {
    const senderIds = [];
    this.messageSets = [];
    for (let i = 0 ; i < data.length ; i++ ) {
      senderIds.push(data[i].senderId);
    }

    const fin: MessageSet[] = [];

    const uniq_ids = Array.from(new Set(senderIds));
    console.log(uniq_ids);

    for (let i = 0 ; i < uniq_ids.length ; i++ ) {
      const temp = [];
      for (let j = 0 ; j < data.length ; j++ ) {
        console.log(data[j]);
        if (data[j].senderId === uniq_ids[i] ) {
          temp.push(data[j]);
        }

      }
      console.log('Message array', temp);
      this.authService.getUser(uniq_ids[i]).subscribe((user: User) => {
        this.messageSets.push(new MessageSet(uniq_ids[i], temp, user.name));
      });

    }
    console.log(this.messageSets);

  }

}



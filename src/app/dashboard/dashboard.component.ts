import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import {Listing} from '../../../Listing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listings: Listing[] = [];
  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.listingService.getListings();
    // console.log('From dashboard comp: ', this.listings);
  }

}

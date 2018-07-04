import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private listingService: ListingService) { }

  ngOnInit(): void {
    this.getListing();
  }

  getListing() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.listingService.getListing(id).subscribe((data) => {
      console.log('Listing: ', data);
    }, (err) => {

    });

  }
}

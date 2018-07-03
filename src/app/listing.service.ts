import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from '../../Listing';

@Injectable({
  providedIn: 'root'
})


export class ListingService {

  constructor(private http: HttpClient) { }

  getListings() {
    this.http.get('/api/listings').subscribe((listings: Listing[]) => {
      console.log(listings);
      return listings;
    });
  }
}

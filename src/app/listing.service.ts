import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from './Listing';

@Injectable({
  providedIn: 'root'
})


export class ListingService {

  list: Listing[];
  constructor(private http: HttpClient) { }

  getListings(): Listing[] {
    this.http.get('/api/listings').subscribe((listings: Listing[]) => {
      console.log(listings);
      this.list =  listings;
    });
    return this.list;
  }
}

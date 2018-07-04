import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from './Listing';

@Injectable({
  providedIn: 'root'
})


export class ListingService {

  list: Listing[];
  constructor(private http: HttpClient) { }

  getListings() {
    return this.http.get('/api/listings');
  }

  getListing(id) {
    return this.http.get(`api/listings/${id}`);
  }

}

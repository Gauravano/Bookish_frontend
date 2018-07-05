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
    return this.http.get('api/listings');
  }

  getListing(id) {
    return this.http.get(`api/listings/${id}`);
  }

  createListing(data) {
    return this.http.post('api/listings/add', {
      book_name: data.book_name,
      author_name: data.author_name,
      condition: data.condition,
      price: data.price,
      image: data.image
    });
  }

}

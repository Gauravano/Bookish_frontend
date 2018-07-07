import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from './Listing';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})


export class ListingService {

  list: Listing[];
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getListings() {
      this.toastr.success('Hello world!', 'Toastr fun!');
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

  getListItems() {
    return this.http.get('api/listings/user');
  }

  deleteWishlistItem(id) {
    return this.http.get(`api/listings/delete/${id}`);
  }

  getFilteredList(data) {
    return this.http.get('api/listings/filter', {
      params: {
        book_name: data.book_name,
        author_name: data.author_name,
        price: data.price,
        condition: data.condition
      }
    });
  }
}

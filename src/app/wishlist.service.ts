import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from './Listing';

@Injectable({
  providedIn: 'root'
})


export class WishlistService {

  wishlist: Listing[];
  constructor(private http: HttpClient) { }

  getWishlist() {
    return this.http.get('/api/wishlist');
  }
}

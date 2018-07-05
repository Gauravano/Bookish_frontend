import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(message, listingId) {
    return this.http.post('api/messages/create', {
      content: message,
      listingId: listingId
    });
  }

  fetchMessages(id) {
    return this.http.get(`api/messages/${id}`);
  }
}

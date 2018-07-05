import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {

  selectedFile: File = null;
  constructor(private listingService: ListingService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  createListing(data) {
    this.onUpload(data);
    // this.listingService.createListing(data).subscribe((listing) => {
    //   console.log(listing);
    //   this.router.navigate(['/dashboard']);
    // }, (err) => {
    //   console.log(err);
    // });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(data) {
    console.log(this.selectedFile);
    const fd: FormData = new FormData();
    fd.append('bookImage', this.selectedFile, this.selectedFile.name);
    fd.append('price', data.price);
    fd.append('book_name', data.book_name);
    fd.append('author_name', data.author_name);
    fd.append('condition', data.condition);

    this.http.post('api/listings/add', fd).subscribe((res) => {
      console.log('res');
    }, (err) => {
      console.log(err);
    });
  }

}


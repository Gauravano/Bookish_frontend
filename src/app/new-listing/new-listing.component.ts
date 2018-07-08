import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../globals';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {
  conditions = ['New', 'Almost new', 'Slightly worn', 'Worn'];
  newListingForm: FormGroup;

  selectedFile: File = null;
  constructor(private listingService: ListingService, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.newListingForm = fb.group({
      book_name: ['', Validators.required],
      author_name: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createListing(data) {
    const fd: FormData = new FormData();
    fd.append('bookImage', this.selectedFile, this.selectedFile.name);
    fd.append('price', data.price);
    fd.append('book_name', data.book_name);
    fd.append('author_name', data.author_name);
    fd.append('condition', data.condition);

    this.http.post('api/listings/add', fd).subscribe((res) => {
      console.log('res', res);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });


  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

}

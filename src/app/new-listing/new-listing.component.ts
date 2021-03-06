import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../globals';
import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {
  conditions = ['New', 'Almost new', 'Slightly worn', 'Worn'];
  newListingForm: FormGroup;
  current_user;
  selectedFile: File = null;
  constructor(private listingService: ListingService, private router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.newListingForm = fb.group({
      book_name: ['', Validators.required],
      author_name: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.current_user = localStorage.getItem('userObject');
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
      this.toastr.success('Listing created and has been added on the dashboard');
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message);
    });


  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        $('#imagePreview')
          .attr('src', e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}

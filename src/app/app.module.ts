import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {ListingService} from './listing.service';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Globals } from './globals';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ListingComponent } from './listing/listing.component';
import { NewListingComponent } from './new-listing/new-listing.component';
import { MessageComponent } from './message/message.component';
import {MessageService} from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    WishlistComponent,
    ListingComponent,
    NewListingComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ListingService, Globals, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

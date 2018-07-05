import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {ListingComponent} from './listing/listing.component';
import {NewListingComponent} from './new-listing/new-listing.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'listings/add', component: NewListingComponent },
  { path: 'listings/:id', component: ListingComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}

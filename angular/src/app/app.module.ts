import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserValidatorGuard } from './gaurds/user-validator.guard';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './components/contact/contact.component';
import { FlightService } from './services/flight.service';
import { BookticketComponent } from './components/bookticket/bookticket.component';
import { TickethistoryComponent } from './components/tickethistory/tickethistory.component';
import { CouponService } from './services/coupon.service';
import { TicketService } from './services/ticket.service';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "contact", component: ContactComponent },
  { path: "bookTicket", component: BookticketComponent },
  { path: "ticketHistory", component: TickethistoryComponent },
  { path: "searchFlight", component: SearchFlightComponent, canActivate: [UserValidatorGuard] },
  { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
  { path: "**", component: LoginComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SearchFlightComponent,
    ContactComponent,
    BookticketComponent,
    TickethistoryComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule,HttpClientModule
  ],
   providers: [FlightService,CouponService,TicketService,SearchFlightComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

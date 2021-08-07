import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageflightsComponent } from './components/manageflights/manageflights.component';
import { ManagecouponComponent } from './components/managecoupon/managecoupon.component';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FlightService } from 'src/app/services/flight.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { UserService } from 'src/app/services/user.service';

const routes: Routes = [
  {
    path: "manageFlights",
    component: ManageflightsComponent
  },
  {
    path: "manageCoupons",
    component: ManagecouponComponent
  }
];

@NgModule({
  declarations: [
    ManageflightsComponent,
    ManagecouponComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),HttpClientModule,ReactiveFormsModule
  ],
  providers :[FlightService,CouponService]
})
export class AdminModule { }

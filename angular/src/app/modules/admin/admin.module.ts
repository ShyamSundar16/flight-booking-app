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
import { ManagescheduleComponent } from './components/manageschedule/manageschedule.component';
import { ScheduleService } from 'src/app/services/schedule.service';

const routes: Routes = [
  {
    path: "manageFlights",
    component: ManageflightsComponent
  },
  {
    path: "manageCoupons",
    component: ManagecouponComponent
  },
  {
    path: "manageSchedule",
    component: ManagescheduleComponent
  }
];

@NgModule({
  declarations: [
    ManageflightsComponent,
    ManagecouponComponent,
    SidenavComponent,
    ManagescheduleComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),HttpClientModule,ReactiveFormsModule
  ],
  providers :[FlightService,CouponService,ScheduleService]
})
export class AdminModule { }

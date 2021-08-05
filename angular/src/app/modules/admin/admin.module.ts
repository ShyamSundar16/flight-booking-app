import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageflightsComponent } from './components/manageflights/manageflights.component';
import { ManagecouponComponent } from './components/managecoupon/managecoupon.component';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';

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
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class AdminModule { }

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

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
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
    SearchFlightComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule,HttpClientModule
  ],
  // providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

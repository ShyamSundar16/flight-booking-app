import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }

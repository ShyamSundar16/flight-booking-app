import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  title = 'fligt-booking-app';

  headerStyle = {
    color: "white",
    "background-color": "#04AA6D",
    "font-style": "italic"
  }

  destinations = [
    "Chennai",
    "Mumbai",
    "Pune",
    "Bangalore"
  ]
  selected = "----"
  
  update(e:any){
    this.selected = e.target.value
  }

}

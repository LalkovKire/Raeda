import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DashCardComponent } from './dash-card/dash-card.component';
import { DashObject } from './dash-service-object';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [RouterLink,NavbarComponent,FooterComponent,DashCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  serviceList: DashObject[] = []

  constructor(){
  }

  ngOnInit(): void {
    this.serviceList = [
      {imageUrl: "../../assets/images/dashboard/car-dashboard.png", name: "Cars"},
      {imageUrl: "../../assets/images/dashboard/location-dashboard.png", name: "Locations"},
      {imageUrl: "../../assets/images/dashboard/rental-dashboard.png", name: "Rentals"}
    ]
  }


}

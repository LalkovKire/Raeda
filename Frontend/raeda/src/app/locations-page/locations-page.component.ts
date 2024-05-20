import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { MapComponent } from '../shared/map/map.component';

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    CommonModule,
    MapComponent
  ],
  templateUrl: './locations-page.component.html',
  styleUrl: './locations-page.component.css'
})
export class LocationsPageComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
  }


}

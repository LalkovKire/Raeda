import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../shared/location.service';
import { CarLocation } from '../dash-service-object';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dash-location-section',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule, 
    RouterLink,
    FooterComponent],
  templateUrl: './dash-location-section.component.html',
  styleUrl: './dash-location-section.component.css'
})
export class DashLocationSectionComponent implements OnInit {

  locations: CarLocation[] = [];

  constructor(
    private locationService: LocationService,
    private messageService: MessageService  
  ){}

  ngOnInit(): void {
    this.initLocations();
  }

  initLocations(): void {
    this.locationService.getAllLocations()
      .subscribe({
        next: (loc) => {
          this.locations = loc;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.description
          })
        }
      })
  }

  deleteLocationById(id: number): void {
    this.locationService.deleteLocationById(id)
      .subscribe({
        next: (loc) => {
          const index = this.locations.map(l => l.locationId).indexOf(loc.locationId);
          this.locations.splice(index,1);
          this.messageService.add({
            severity: 'success',
            detail: 'Location deleted successfuly'
          })
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            detail: 'The location is associated with other Cars and Rentals.'
          })
        }
      })
  }
}

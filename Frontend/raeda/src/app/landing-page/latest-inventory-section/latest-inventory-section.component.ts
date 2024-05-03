import { Component, inject } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { CarService } from '../../car.service';
import { CarModel } from '../../car.model';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorComponent } from '../../components/error/error.component';

@Component({
  selector: 'app-latest-inventory-section',
  standalone: true,
  imports: [CardsComponent, LoadingComponent, ErrorComponent],
  templateUrl: './latest-inventory-section.component.html',
  styleUrl: './latest-inventory-section.component.css',
})
export class LatestInventorySectionComponent {
  private carsService = inject(CarService);
  cars: CarModel[] = [];
  isLoading = true;
  error = '';

  ngOnInit(): void {
    this.isLoading = true;

    this.carsService.getLatestInventory().subscribe({
      next: (cars) => {
        this.isLoading = false;
        this.cars = cars;
      },
      error: () => {
        this.isLoading = false;
        this.error =
          "Sorry, we couldn't retrieve the latest inventory at the moment. Please try again later or contact support for assistance.";
      },
    });
  }
}

import { Component } from '@angular/core';
import { CarCard } from '../../../car-card.model';
import { CarCardComponent } from '../../../car-card/car-card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  cars: CarCard[] = [
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      220,
      'Petrol',
      2,
      2,
      2016,
      400
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      220,
      'Petrol',
      2,
      2,
      2016,
      400
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      220,
      'Petrol',
      2,
      2,
      2016,
      400
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      220,
      'Petrol',
      2,
      2,
      2016,
      400
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      220,
      'Petrol',
      2,
      2,
      2016,
      400
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      220,
      'Petrol',
      2,
      2,
      2016,
      400
    ),
  ];
}

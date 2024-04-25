import { Component } from '@angular/core';
import { CarCard } from '../../../car-card.model';
import { CarCardComponent } from '../../../component/car-card/car-card.component';

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
      'Automatic',
      'Petrol',
      2,
      'v8',
      2016,
      400,
      'Skopje',
      1
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      'Automatic',
      'Petrol',
      2,
      'v8',
      2016,
      400,
      'Strumica',
      1
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      'Automatic',
      'Petrol',
      2,
      'v8',
      2016,
      400,
      'Skopje',
      1
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      'Automatic',
      'Petrol',
      2,
      'v8',
      2016,
      400,
      'Ohrid',
      0
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      'Automatic',
      'Petrol',
      2,
      'v8',
      2016,
      400,
      'Skopje',
      1
    ),
    new CarCard(
      '/assets/images/cars/hero-car.png',
      'Mercedes-Benz AMG GT',
      'Sport Car',
      2,
      'Automatic',
      'Petrol',
      2,
      'v8',
      2016,
      400,
      'Strumica',
      0
    ),
  ];
}

import { Component, Input } from '@angular/core';
import { CarModel } from '../../car.model';

@Component({
  selector: 'car-card',
  standalone: true,
  imports: [],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input() car: CarModel | undefined;
}

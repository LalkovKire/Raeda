import { Component, Input } from '@angular/core';
import { CarCard } from '../car-card.model';

@Component({
  selector: 'car-card',
  standalone: true,
  imports: [],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input() car: CarCard | undefined;
}

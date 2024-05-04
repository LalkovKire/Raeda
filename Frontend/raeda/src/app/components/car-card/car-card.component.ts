import { Component, Input } from '@angular/core';
import { CarModel } from '../../shared/car.model';
import { NgClass } from '@angular/common';
import { CarStatus } from '../../shared/car-status';

@Component({
  selector: 'car-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  // @ts-ignore
  @Input() car: CarModel;
}

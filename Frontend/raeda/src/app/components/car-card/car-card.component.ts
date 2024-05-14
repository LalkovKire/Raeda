import { Component, Input } from '@angular/core';
import { CarModel } from '../../shared/car.model';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'car-card',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  // @ts-ignore
  @Input() car: CarModel;
}

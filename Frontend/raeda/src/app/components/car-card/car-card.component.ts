import { Component, inject, Input } from '@angular/core';
import { CarModel } from '../../shared/car.model';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

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
  router = inject(Router);
  path = './';

  ngOnInit(): void {
    if (!this.router.url.includes('cars')) this.path = 'cars';
  }
}

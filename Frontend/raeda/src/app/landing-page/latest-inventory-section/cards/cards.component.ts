import { Component, Input } from '@angular/core';
import { CarModel } from '../../../shared/car.model';
import { CarCardComponent } from '../../../components/car-card/car-card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  @Input() cars: CarModel[] = [];
}

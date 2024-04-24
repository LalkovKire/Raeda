import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';

@Component({
  selector: 'app-latest-inventory-section',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './latest-inventory-section.component.html',
  styleUrl: './latest-inventory-section.component.css',
})
export class LatestInventorySectionComponent {}

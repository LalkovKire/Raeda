import { Component } from '@angular/core';
import { BrandCardComponent } from '../../brand-card/brand-card.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [BrandCardComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {}

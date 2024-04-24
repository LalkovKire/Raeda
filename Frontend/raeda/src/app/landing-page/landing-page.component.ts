import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { LatestInventorySectionComponent } from './latest-inventory-section/latest-inventory-section.component';
import { WhyUsSectionComponent } from './why-us-section/why-us-section.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    LatestInventorySectionComponent,
    WhyUsSectionComponent,
    SubscriptionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}

import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { signInGuard } from './guards/sign-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCarsSectionComponent } from './dashboard/dash-cars-section/dash-cars-section.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'signin',
    component: SignInPageComponent,
    canActivate: [signInGuard],
  },
  {
    path: 'signup',
    component: SignUpPageComponent,
    canActivate: [signInGuard],
  },
  {
    path: 'cars',
    component: CarsPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/cars',
    component: DashCarsSectionComponent
  }
];

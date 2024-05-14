import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { signInGuard } from './guards/sign-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCarsSectionComponent } from './dashboard/dash-cars-section/dash-cars-section.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarAddFormComponent } from './dashboard/car-add-form/car-add-form.component';

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
    component: CarsPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/cars',
    component: DashCarsSectionComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/cars/add',
    component: CarAddFormComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

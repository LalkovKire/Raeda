import {Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SignInPageComponent} from './sign-in-page/sign-in-page.component';
import {SignUpPageComponent} from './sign-up-page/sign-up-page.component';
import {CarsPageComponent} from './cars-page/cars-page.component';
import {signInGuard} from './guards/sign-in.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashCarsSectionComponent} from './dashboard/dash-cars-section/dash-cars-section.component';
import {authGuardGuard} from './guards/auth-guard.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CarAddFormComponent} from './dashboard/car-add-form/car-add-form.component';
import {CarDetailsPageComponent} from './car-details-page/car-details-page.component';
import {DashLocationSectionComponent} from './dashboard/dash-location-section/dash-location-section.component';
import {LocationAddFormComponent} from './dashboard/location-add-form/location-add-form.component';
import {DashRentalSectionComponent} from './dashboard/dash-rental-section/dash-rental-section.component';
import {MyRentsPageComponent} from "./my-rents-page/my-rents-page.component";
import {canLoadGuard} from "./guards/can-load.guard";

export const routes: Routes = [
  {path: '', component: LandingPageComponent, pathMatch: 'full'},
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
    children: [
      {
        path: '',
        component: CarsPageComponent,
      },
      {
        path: ':id',
        component: CarDetailsPageComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'dashboard/cars',
    component: DashCarsSectionComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/cars/add',
    component: CarAddFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/locations',
    component: DashLocationSectionComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/locations/add',
    component: LocationAddFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/rentals',
    component: DashRentalSectionComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dashboard/rentals/add',
    component: LocationAddFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: "my-rents",
    component: MyRentsPageComponent,
    canActivate: [canLoadGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

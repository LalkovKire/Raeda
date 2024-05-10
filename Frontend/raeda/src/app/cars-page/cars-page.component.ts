import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CarService } from '../shared/car.service';
import { CarModel } from '../shared/car.model';
import { CarCardComponent } from '../components/car-card/car-card.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { ErrorComponent } from '../components/error/error.component';
import { FilterSidebarComponent } from '../components/filter-sidebar/filter-sidebar.component';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CarCardComponent,
    LoadingComponent,
    ErrorComponent,
    FilterSidebarComponent,
  ],
  templateUrl: './cars-page.component.html',
  styleUrl: './cars-page.component.css',
})
export class CarsPageComponent {
  cars: CarModel[] = [];
  carService = inject(CarService);
  route = inject(ActivatedRoute);
  isLoading = false;
  error = false;
  toggleFilterBy = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.isLoading = true;
    this.error = false;

    this.route.queryParams
      .pipe(switchMap((params) => this.carService.getCarsByFiltering(params)))
      .subscribe({
        next: (cars) => {
          this.cars = cars;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.error = true;
        },
      });
  }

  onToggleFilterBy() {
    this.toggleFilterBy.next(true);
  }
}

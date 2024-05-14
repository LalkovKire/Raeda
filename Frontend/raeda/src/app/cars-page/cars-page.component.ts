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
import { PaginatorComponent } from '../components/paginator/paginator.component';

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
    PaginatorComponent
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
  }

  onToggleFilterBy() {
    this.toggleFilterBy.next(true);
  }

  onCarsChanged(cars: CarModel[]): void {
    this.cars = cars; 
  }

}

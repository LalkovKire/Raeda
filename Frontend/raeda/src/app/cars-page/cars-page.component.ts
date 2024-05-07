import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CarService } from '../shared/car.service';
import { CarModel } from '../shared/car.model';
import { CarCardComponent } from '../components/car-card/car-card.component';
import { SidebarModule } from 'primeng/sidebar';
import { LoadingComponent } from '../components/loading/loading.component';
import { AccordionModule } from 'primeng/accordion';
import { ErrorComponent } from '../components/error/error.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

interface Price {
  title: string;
  amount: number;
}

@Component({
  selector: 'app-cars-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CarCardComponent,
    SidebarModule,
    LoadingComponent,
    ErrorComponent,
    AccordionModule,
    ReactiveFormsModule,
    SliderModule,
    ListboxModule,
    CalendarModule,
    InputSwitchModule,
  ],
  templateUrl: './cars-page.component.html',
  styleUrl: './cars-page.component.css',
})
export class CarsPageComponent {
  cars: CarModel[] = [];
  carService = inject(CarService);
  toggleFilterBy = false;
  isLoading = false;
  error = false;
  form: FormGroup = new FormGroup({});
  locations = ['All', 'Skopje', 'Strumica', 'Kavadarci'];
  prices: Price[] = [
    { title: 'All', amount: 0 },
    { title: 'Under 200€', amount: 200 },
    { title: 'Under 400€', amount: 400 },
    { title: 'Under 600€', amount: 600 },
    { title: 'Under 800€', amount: 800 },
    { title: 'Under 1000€', amount: 1000 },
  ];
  brands = ['Porsche', 'Audi', 'Mercedes', 'BMW', 'Ford', 'Toyota'];
  years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  fuels = ['All', 'Petrol', 'Diesel'];
  gears = ['All', 'Manuel', 'Automatic'];

  ngOnInit(): void {
    this.form = this.initForm();

    this.isLoading = true;
    this.error = false;
    this.carService.getAllCars().subscribe({
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
    this.toggleFilterBy = !this.toggleFilterBy;
  }

  initForm() {
    return new FormGroup({
      selectedLocation: new FormControl(this.locations[0]),
      selectedPickupDate: new FormControl(null),
      selectedPrice: new FormControl(this.prices[0]),
      selectedBrands: new FormControl(this.brands),
      selectedYears: new FormControl(this.years),
      selectedFuel: new FormControl(this.fuels[0]),
      selectedGear: new FormControl(this.gears[0]),
      selectedAvailability: new FormControl(null),
    });
  }
}

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BehaviorSubject } from 'rxjs';

interface Price {
  title: string;
  amount: number;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    AccordionModule,
    ReactiveFormsModule,
    ListboxModule,
    CalendarModule,
    InputSwitchModule,
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
})
export class FilterSidebarComponent {
  @Input() toggleFilterBy: BehaviorSubject<boolean> | undefined;
  toggle: boolean | undefined;
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
    this.toggleFilterBy?.subscribe((val: boolean) => (this.toggle = val));
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

  hide() {
    this.toggleFilterBy?.next(false);
  }
}

import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilterService } from './filter.service';
import { DefaultSelectionValuesService } from './default-selection-values.service';
import { FilterForm } from './filter-form';
import { DateService } from '../../shared/date.service';
import { LowerCasePipe } from '@angular/common';

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

  private filterService = inject(FilterService);
  defaultSelectionValuesService = inject(DefaultSelectionValuesService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  dateService = inject(DateService);

  toggle: boolean | undefined;
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.initForm();
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((values: FilterForm) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: this.filterService.buildQueryParams(values),
        });
      });
    this.toggleFilterBy?.subscribe((val: boolean) => (this.toggle = val));
  }

  initForm() {
    const location =
      this.route.snapshot.queryParams['location'] ??
      this.defaultSelectionValuesService.locations[0];
    const pickup = this.route.snapshot.queryParams['pickupDate']
      ? this.dateService.convertStringToDate(
          this.route.snapshot.queryParams['pickupDate']
        )
      : new Date();
    let price = this.route.snapshot.queryParams['price'];

    const brands = this.route.snapshot.queryParams['brand']?.split(',') ?? [];
    let years = this.route.snapshot.queryParams['year']?.split(',') ?? [];
    const fuel =
      this.route.snapshot.queryParams['fuel'] ??
      this.defaultSelectionValuesService.fuels[0];
    const gear =
      this.route.snapshot.queryParams['gear'] ??
      this.defaultSelectionValuesService.gears[0];
    const available = !!(
      this.route.snapshot.queryParams['availableOnly'] ?? false
    );

    price =
      this.defaultSelectionValuesService.prices.find(
        (p) => p.amount === +price
      ) ?? this.defaultSelectionValuesService.prices[0];
    years = years.map((year: string) => +year);

    return new FormGroup({
      selectedLocation: new FormControl(location),
      selectedPickupDate: new FormControl(pickup),
      selectedPrice: new FormControl(price),
      selectedBrands: new FormControl(brands),
      selectedYears: new FormControl(years),
      selectedFuel: new FormControl(fuel),
      selectedGear: new FormControl(gear),
      selectedAvailability: new FormControl(available),
    });
  }

  hide() {
    this.toggleFilterBy?.next(false);
  }
}

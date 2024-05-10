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

    return new FormGroup({
      selectedLocation: new FormControl(location),
      selectedPickupDate: new FormControl(pickup),
      selectedPrice: new FormControl(
        this.defaultSelectionValuesService.prices[0]
      ),
      selectedBrands: new FormControl([]),
      selectedYears: new FormControl([]),
      selectedFuel: new FormControl(
        this.defaultSelectionValuesService.fuels[0]
      ),
      selectedGear: new FormControl(
        this.defaultSelectionValuesService.gears[0]
      ),
      selectedAvailability: new FormControl(false),
    });
  }

  hide() {
    this.toggleFilterBy?.next(false);
  }

  test() {
    console.log('da');
  }
}

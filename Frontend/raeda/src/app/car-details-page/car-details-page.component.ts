import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../landing-page/navbar/navbar.component';
import {FooterComponent} from '../components/footer/footer.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../shared/car.service';
import {switchMap, tap} from 'rxjs';
import {CarModel} from '../shared/car.model';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Location} from '@angular/common';
import {DateService} from '../shared/date.service';
import {InfoComponent} from '../components/info/info.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserStorageService} from '../shared/browserStorage.service';
import {WarningComponent} from '../components/warning/warning.component';
import {RentalService} from '../shared/rental.service';
import {RentalModel} from '../shared/rental.model';
import {MessageService} from 'primeng/api';
import {DatesModel} from '../shared/dates.model';

@Component({
  selector: 'app-car-details-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    InfoComponent,
    DialogModule,
    WarningComponent,
  ],
  templateUrl: './car-details-page.component.html',
  styleUrl: './car-details-page.component.css',
})
export class CarDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private location = inject(Location);
  private date = inject(DateService);
  private browserStorageService = inject(BrowserStorageService);
  private rentalService = inject(RentalService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private dateService = inject(DateService);

  car: CarModel | undefined;
  form: FormGroup = new FormGroup({});
  minDatePickup = new Date();
  minDateReturn = new Date();
  maxDate: Date | null = null;
  locations = ['Skopje', 'Strumica', 'Kavadarci'];
  dayDuration = 1;
  total = 0;
  insurance = 10;
  visible = false;
  isLoggedIn = false;
  dates: DatesModel[] = [];
  pickup: Date[] = [];

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((value) => {
      this.isLoggedIn = !!value;
    });

    this.route.params
      .pipe(
        switchMap(({id}) => this.carService.getCar(+id)),
        tap((car) => {
          this.car = car;
          this.total = this.car?.price * this.dayDuration + this.insurance;
        }),
        switchMap((car) => this.carService.getCarDates(car.carID))
      )
      .subscribe((dates) => {
        this.dates = dates;
        dates.map((date) => {
          const disablePickupDates = this.dateService.getDatesBetween(
            new Date(date.pickup),
            new Date(date.dropOff)
          );
          this.pickup.push(...disablePickupDates);
          let firstAvailableDate = this.dateService.pickup ?? new Date();

          this.pickup
            .sort(this.dateService.compareDates)
            .forEach(date => {
              if (date.getDate() === firstAvailableDate.getDate()) {
                firstAvailableDate.setDate(firstAvailableDate.getDate() + 1);
              }
            });

          this.form.patchValue({pickupDate: firstAvailableDate});

          this.maxDropOffDate(firstAvailableDate);
        });
      });

    this.form = this.initForm();

    this.form.get('pickupDate')?.valueChanges.subscribe((val) => {
      this.form.get('returnDate')?.setValue(val);
      this.minDateReturn = val;

      this.maxDropOffDate(val);

    });

    this.form.get('returnDate')?.valueChanges.subscribe(() => {
      const pickupDate = this.form.get('pickupDate')?.value;
      const returnDate = this.form.get('returnDate')?.value;

      this.dayDuration = this.date.dateDiffInDays(pickupDate, returnDate) + 1;

      if (this.car?.price)
        this.total = this.car.price * this.dayDuration + this.insurance;
    });
  }

  private initForm() {
    const date = this.dateService.pickup ?? new Date();

    return new FormGroup({
      pickupDate: new FormControl(date, Validators.required),
      returnDate: new FormControl(date, Validators.required),
    });
  }

  onSubmit() {
    this.visible = true;
  }

  onRentACar() {
    const pickupTime = this.dateService.convertToISOString(
      this.form.value['pickupDate']
    );
    const dropOffTime = this.dateService.convertToISOString(
      this.form.value['returnDate']
    );

    const carId = this.car?.carID;
    let email = null;
    this.browserStorageService.isSignIn.subscribe(
      (val) => (email = val?.email)
    );
    const locationId = this.car?.location.locationId;

    if (carId === undefined || email === null || locationId === undefined)
      return;

    const rental = new RentalModel(
      pickupTime,
      dropOffTime,
      carId,
      email,
      locationId
    );

    this.rentalService.rentACar(rental).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          detail: 'This car is successfully rented',
        });
        this.router.navigate(['/cars']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description ?? err.error,
        });
      },
    });
    this.visible = false;
  }

  onGoBack() {
    this.location.back();
  }

  private maxDropOffDate(val: Date) {
    let date = this.dates.find((date) => val < new Date(date.pickup));

    if (!date) {
      this.maxDate = null;
      return;
    }

    this.maxDate = new Date(date.pickup);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }
}

import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../shared/car.service';
import { switchMap } from 'rxjs';
import { CarModel } from '../shared/car.model';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { DateService } from '../shared/date.service';
import { InfoComponent } from '../components/info/info.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserStorageService } from '../shared/browserStorage.service';
import { WarningComponent } from '../components/warning/warning.component';

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
export class CarDetailsPageComponent {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private location = inject(Location);
  private date = inject(DateService);
  private browserStorageService = inject(BrowserStorageService);

  car: CarModel | undefined;
  form: FormGroup = new FormGroup({});
  minDatePickup = new Date();
  minDateReturn = new Date();
  locations = ['Skopje', 'Strumica', 'Kavadarci'];
  dayDuration = 1;
  total = 0;
  insurance = 10;
  visible = false;
  isLoggedIn = false;

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((value) => {
      if (value) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });

    this.route.params
      .pipe(switchMap(({ id }) => this.carService.getCar(+id)))
      .subscribe((car) => {
        this.car = car;
        this.total = this.car?.price * this.dayDuration + this.insurance;
      });

    this.form = this.initForm();

    this.form.get('pickupDate')?.valueChanges.subscribe((val) => {
      this.form.get('returnDate')?.setValue(val);
      this.minDateReturn = val;
    });

    this.form.get('returnDate')?.valueChanges.subscribe((val) => {
      const pickupDate = this.form.get('pickupDate')?.value;
      const returnDate = this.form.get('returnDate')?.value;

      this.dayDuration = this.date.dateDiffInDays(pickupDate, returnDate) + 1;

      if (this.car?.price)
        this.total = this.car.price * this.dayDuration + this.insurance;
    });
  }

  private initForm() {
    const date = new Date();

    return new FormGroup({
      pickupDate: new FormControl(date, Validators.required),
      returnDate: new FormControl(date, Validators.required),
    });
  }

  onSubmit() {
    this.visible = true;
  }

  restrict(p: Event) {
    p.preventDefault();
  }

  onGoBack() {
    this.location.back();
  }
}

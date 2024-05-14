import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { LocationService } from '../../shared/location.service';
import { CarLocation } from '../dash-service-object';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../shared/car.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-add-form',
  standalone: true,
  imports: [DropdownModule,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './car-add-form.component.html',
  styleUrl: './car-add-form.component.css'
})
export class CarAddFormComponent implements OnInit, OnDestroy {

  gearBox = ["Automatic", "Manual"];
  years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  locations: CarLocation[] = [];
  formGroup!: FormGroup;
  carSubscription: Subscription | undefined;
  locationSubscription: Subscription | undefined;

  constructor(
    private location: Location,
    private service: LocationService,
    private carService: CarService,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnDestroy(): void {
    this.carSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.loadLocations();
  }

  initForm() {

    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.formGroup = new FormGroup(
      {
       brand: new FormControl('', Validators.required),
       model: new FormControl('', Validators.required),
       type: new FormControl('', Validators.required),
       imageUrl: new FormControl('',
        [Validators.required, Validators.pattern(urlRegex)]),
       seats: new FormControl('', 
        [Validators.required,Validators.min(2), Validators.max(8)]),
       doors: new FormControl('',
        [Validators.required,Validators.min(2), Validators.max(6)]),
       fuel: new FormControl('', Validators.required),
       licensePlate: new FormControl('',
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
       engine: new FormControl('', Validators.required),
       price: new FormControl('',
        [Validators.required, Validators.min(100)]),
       gearBox: new FormControl('', Validators.required),
       location: new FormControl('', Validators.required),
       year: new FormControl('', Validators.required)
      }
    )
    
  }

  loadLocations(): void {
    this.locationSubscription = this.service.getAllLocations()
    .subscribe({
      next: (loc) => {
        this.locations = loc;
      },
      error: (err) => console.log(err)
    })
  }

  submitCar(): void {
    const tmpGear = this.gearBox.at(this.formGroup.get('gearBox')?.value);
    const tmpLocation = this.locations.at(this.formGroup.get('location')?.value);
    const tmpYear = this.years.at(this.formGroup.get('year')?.value);
    

    this.carSubscription = this.carService.addNewCar({
      image: this.formGroup.get('imageUrl')?.value,
      model: this.formGroup.get('model')?.value,
      carType: this.formGroup.get('type')?.value,
      seats: this.formGroup.get('seats')?.value,
      gearBox: (tmpGear!=undefined) ? tmpGear : '',
      yearMade: (tmpYear!=undefined) ? tmpYear : 2017,
      doors: this.formGroup.get('doors')?.value,
      fuelType: this.formGroup.get('fuel')?.value,
      engine: this.formGroup.get('engine')?.value,
      price: this.formGroup.get('price')?.value,
      locationID: (tmpLocation != undefined) ? tmpLocation.locationId : 1,
      brand: this.formGroup.get('brand')?.value,
      licensePlate: this.formGroup.get('licensePlate')?.value
    }).subscribe({
      next: (succ) => {
        this.messageService.add({
          severity: 'success',
          detail: "Car added successfully"
        })
          this.router.navigateByUrl("/dashboard/cars");
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description
        })
      }
    })

  }

  goBack(): void {
    this.location.back();
  }
}

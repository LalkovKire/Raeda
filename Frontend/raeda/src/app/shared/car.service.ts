import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CarModel } from './car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private http = inject(HttpClient);

  getAllCars() {
    return this.http.get<CarModel[]>('http://localhost:8080/api/cars');
  }

  getLatestInventory() {
    return this.http.get<CarModel[]>('http://localhost:8080/api/cars/latest');
  }
}

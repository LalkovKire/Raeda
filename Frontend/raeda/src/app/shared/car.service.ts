import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CarModel, CarRequest } from './car.model';
import { inject, Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';
import { Pageable } from './pageable';
import { Observable } from 'rxjs';
import { DatesModel } from './dates.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private token = localStorage.getItem('token');
  private url = 'http://localhost:8080/api/cars';
  private http = inject(HttpClient);
  isLoading = signal(false);
  error = signal(false);

  getAllCars() {
    return this.http.get<CarModel[]>(`${this.url}`);
  }

  getLatestInventory() {
    return this.http.get<CarModel[]>(`${this.url}/latest`);
  }

  getCarsByFiltering(
    params: Params,
    page: number,
    size: number
  ): Observable<Pageable<CarModel>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page.toString());
    queryParams = queryParams.append('size', size.toString());

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }

    return this.http.get<Pageable<CarModel>>(`${this.url}/filter`, {
      params: queryParams,
    });
  }

  addNewCar(car: CarRequest): Observable<CarModel> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.post<CarModel>(`${this.url}`, car, requestOptions);
    } else throw new Error('Token must be present');
  }

  editCarById(id: number, car: CarRequest): Observable<CarModel> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.put<CarModel>(
        `${this.url}/edit/${id}`,
        car,
        requestOptions
      );
    } else throw new Error('Token must be present');
  }

  deleteCarById(id: number): Observable<CarModel> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.delete<CarModel>(`${this.url}/${id}`, requestOptions);
    } else throw Error('Something went wrong while deleting');
  }

  getCar(id: number) {
    return this.http.get<CarModel>(`${this.url}/${id}`);
  }

  getCarDates(id: number) {
    return this.http.get<DatesModel[]>(`${this.url}/${id}/rentals`);
  }
}

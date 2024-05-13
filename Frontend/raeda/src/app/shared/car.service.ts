import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CarModel } from './car.model';
import { Params } from '@angular/router';
import { Pageable } from './pageable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
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

  deleteCarById(id: number): Observable<CarModel> {
    let token = localStorage.getItem('token');

    if (token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.delete<CarModel>(`${this.url}/${id}`, requestOptions);
    } else {
      return this.http.delete<CarModel>(`${this.url}/${id}`);
    }
  }
}

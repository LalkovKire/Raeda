import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {RentalModel} from './rental.model';
import {Observable} from 'rxjs';
import {DashRental} from '../dashboard/dash-service-object';

@Injectable({
  providedIn: 'root',
})
export class RentalService {

  private token = localStorage.getItem('token');
  private http = inject(HttpClient);
  private url2 = 'http://localhost:8080/api/cars';
  private url = 'http://localhost:8080/api/rental';

  rentACar(rentalInformation: RentalModel) {
    return this.http.post(`${this.url2}/rent`, rentalInformation);
  }

  getAllRentals(): Observable<DashRental[]> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };
      return this.http.get<DashRental[]>(`${this.url}`, requestOptions);
    } else throw new Error("Token must be present");
  }

  getUserRentals(email: string) {
    if (this.token === null) return;

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<DashRental[]>(`http://localhost:8080/api/user/rentals?email=${email}`, requestOptions);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RentalModel } from './rental.model';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/cars';

  rentACar(rentalInformation: RentalModel) {
    return this.http.post(`${this.url}/rent`, rentalInformation);
  }
}

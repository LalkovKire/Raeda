import {Component, inject, OnInit} from '@angular/core';
import {RentalService} from "../shared/rental.service";
import {BrowserStorageService} from "../shared/browserStorage.service";
import {DashRental} from "../dashboard/dash-service-object";
import {NavbarComponent} from "../landing-page/navbar/navbar.component";
import {FooterComponent} from "../components/footer/footer.component";
import {DatePipe} from "@angular/common";
import {DateService} from "../shared/date.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-rents-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, DatePipe, RouterLink],
  templateUrl: './my-rents-page.component.html',
  styleUrl: './my-rents-page.component.css'
})
export class MyRentsPageComponent implements OnInit {
  browserStorageService = inject(BrowserStorageService);
  rentalService = inject(RentalService);
  dateService = inject(DateService);
  rents: DashRental[] | null = null;

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((user) => {
      if (user === null) return;
      this.rentalService.getUserRentals(user.email)?.subscribe(rents => this.rents = rents);
    });
  }

}

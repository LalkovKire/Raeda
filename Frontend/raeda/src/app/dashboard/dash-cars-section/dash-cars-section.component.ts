import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { DashboardService } from '../dashboard-service';
import { DashCarModel } from '../dash-service-object';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-cars-section',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './dash-cars-section.component.html',
  styleUrl: './dash-cars-section.component.css'
})
export class DashCarsSectionComponent implements OnInit {

  cars: DashCarModel[] = [];

  constructor(private carService: DashboardService) {
  }

  ngOnInit(): void {
    this.carService.fetchAllCars()
    .subscribe(
      {
        next: (succ) =>  {
          this.cars = succ;
          console.log(succ);
        },
        error: (err) => console.log(err)
      }
    );
  }

  deleteCarEntry(id: number) : void {
    this.carService.deleteCarById(id)
      .subscribe({
        next: (succ) => {
          let ind = this.cars.indexOf(succ)
          this.cars.splice(ind,1);
        },
        error: (err) => console.log(err)
      });
  }

}

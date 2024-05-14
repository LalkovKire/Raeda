import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { BehaviorSubject } from 'rxjs';
import { CarService } from '../../shared/car.service';
import { CarModel } from '../../shared/car.model';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-cars-section',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule,FilterSidebarComponent, PaginatorComponent, RouterLink],
  templateUrl: './dash-cars-section.component.html',
  styleUrl: './dash-cars-section.component.css'
})
export class DashCarsSectionComponent implements OnInit {

  cars: CarModel[] = [];
  toggleFilterBy = new BehaviorSubject<boolean>(false);

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
  }

  deleteCarEntry(id: number): void {
    this.carService.deleteCarById(id)
      .subscribe({
        next: (succ) => {
          let ind = this.cars.indexOf(succ)
          this.cars.splice(ind,1);
        },
        error: (err) => console.log(err)
      });
  }

  onToggleFilterBy() {
    this.toggleFilterBy.next(true);
  }

  onCarsChanged(cars: CarModel[]): void {
    console.log("something");
    
    this.cars = cars; 
  }

}

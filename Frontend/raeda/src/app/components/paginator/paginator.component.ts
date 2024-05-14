import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarService } from '../../shared/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CarModel } from '../../shared/car.model';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  currentPage = 0;
  pageSize = 6;
  totalPages = 0;
  pages: number[] = [];
  @Output() carsChanged: EventEmitter<CarModel[]> = new EventEmitter<CarModel[]>();

  constructor(private service: CarService, private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {   
    this.route.queryParams
    .pipe(
      switchMap((params) => {
        return this.service.getCarsByFiltering(params, this.currentPage, this.pageSize)
      }) 
    ).subscribe({
        next: (cars) => {
          this.totalPages = cars.totalPages;
          this.currentPage = cars.number;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          console.log(cars.content);
          this.carsChanged.emit(cars.content);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page - 1;
      this.updateQueryParams();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updateQueryParams();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateQueryParams();
    }
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, size: this.pageSize },
      queryParamsHandling: 'merge'
    });
  }

}
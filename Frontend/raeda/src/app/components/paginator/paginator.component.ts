import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarService } from '../../shared/car.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CarModel } from '../../shared/car.model';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent implements OnInit {
  currentPage = 0;
  pageSize = 100;
  totalPages = 0;
  pages: number[] = [];
  @Output() carsChanged: EventEmitter<CarModel[]> = new EventEmitter<
    CarModel[]
  >();
  private queryParamsSubscription: Subscription | undefined;

  constructor(private service: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.service.isLoading.set(true);
    this.service.error.set(false);
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          if (this.queryParamsSubscription !== undefined)
            this.queryParamsSubscription.unsubscribe();
          return this.service.getCarsByFiltering(params, 0, this.pageSize);
        })
      )
      .subscribe({
        next: (cars) => {
          this.totalPages = cars.totalPages;
          this.currentPage = 0;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.carsChanged.emit(cars.content);
          this.service.isLoading.set(false);
          this.service.error.set(false);
        },
        error: (error) => {
          this.service.isLoading.set(false);
          this.service.error.set(true);
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 0 && page <= this.totalPages) {
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
    this.service.isLoading.set(true);
    this.service.error.set(false);
    this.queryParamsSubscription = this.route.queryParams
      .pipe(
        switchMap((params) => {
          return this.service.getCarsByFiltering(
            params,
            this.currentPage,
            this.pageSize
          );
        })
      )
      .subscribe({
        next: (cars) => {
          this.totalPages = cars.totalPages;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.carsChanged.emit(cars.content);
          this.service.isLoading.set(false);
          this.service.error.set(false);
        },
        error: (error) => {
          this.service.isLoading.set(false);
          this.service.error.set(true);
        },
      });
  }
}

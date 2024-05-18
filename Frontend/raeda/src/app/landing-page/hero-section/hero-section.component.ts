import { Component, inject, OnInit } from '@angular/core';
import { BrandCardComponent } from '../../components/brand-card/brand-card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { DateService } from '../../shared/date.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    BrandCardComponent,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit {
  messageService = inject(MessageService);
  dateService = inject(DateService);
  router = inject(Router);
  form: FormGroup = new FormGroup({});
  minDatePickup = new Date();
  minDateReturn = new Date();
  locations = ['Skopje', 'Strumica', 'Kavadarci'];

  ngOnInit(): void {
    this.form = this.initForm();

    // this.form.get('pickupDate')?.valueChanges.subscribe((val) => {
    //   this.form.get('returnDate')?.setValue(val);
    //   this.minDateReturn = val;
    // });
  }

  onSubmit() {
    if (!this.form.controls['location'].valid) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please select location',
      });
      return;
    }

    const query = {
      location: this.form.value.location,
      pickupDate: this.dateService.convertDateToString(
        this.form.value.pickupDate
      ),
      // dropOffDate: this.dateService.convertDateToString(
      //   this.form.value.returnDate
      // ),
    };

    this.router.navigate(['/cars'], { queryParams: query });
  }

  private initForm() {
    const date = new Date();

    return new FormGroup({
      location: new FormControl(null, Validators.required),
      pickupDate: new FormControl(date, Validators.required),
      // returnDate: new FormControl(date, Validators.required),
    });
  }

  restrict(p: Event) {
    p.preventDefault();
  }
}

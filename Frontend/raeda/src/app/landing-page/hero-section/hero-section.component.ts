import { Component, inject, OnInit } from '@angular/core';
import { BrandCardComponent } from '../../component/brand-card/brand-card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

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
  form: FormGroup = new FormGroup({});
  minDatePickup = new Date();
  minDateReturn = new Date();
  cities: { name: string }[] = [];

  ngOnInit(): void {
    this.form = this.initForm();

    this.form.get('pickupDate')?.valueChanges.subscribe((val) => {
      this.form.get('returnDate')?.setValue(val);
      this.minDateReturn = val;
    });

    this.cities = [
      { name: 'Skopje' },
      { name: 'Strumica' },
      { name: 'Kavadarci' },
    ];
  }

  onSubmit() {
    if (!this.form.controls['location'].valid) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please select city',
      });
      return;
    }

    console.log(this.form);
  }

  private initForm() {
    const date = new Date();

    return new FormGroup({
      location: new FormControl(null, Validators.required),
      pickupDate: new FormControl(date, Validators.required),
      returnDate: new FormControl(date, Validators.required),
    });
  }

  restrict(p: Event) {
    p.preventDefault();
  }
}

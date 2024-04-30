import { Component, OnInit } from '@angular/core';
import { BrandCardComponent } from '../../component/brand-card/brand-card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [BrandCardComponent, ReactiveFormsModule, CalendarModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  minDatePickup = new Date();
  minDateReturn = new Date();

  ngOnInit(): void {
    this.form = this.initForm();

    this.form.get('pickupDate')?.valueChanges.subscribe((val) => {
      this.form.get('returnDate')?.setValue(val);
      this.minDateReturn = val;
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  private initForm() {
    const date = new Date();

    return new FormGroup({
      location: new FormControl('All', Validators.required),
      pickupDate: new FormControl(date, Validators.required),
      returnDate: new FormControl(date, Validators.required),
    });
  }

  restrict(p: Event) {
    p.preventDefault();
  }
}

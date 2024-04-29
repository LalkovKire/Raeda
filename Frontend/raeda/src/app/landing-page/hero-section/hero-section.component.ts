import { Component, OnInit } from '@angular/core';
import { BrandCardComponent } from '../../component/brand-card/brand-card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [BrandCardComponent, ReactiveFormsModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  minDatePickup = this.getCurrentDate();
  minDateReturn = this.getCurrentDate();

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
    const date = this.getCurrentDate();

    return new FormGroup({
      location: new FormControl('All', Validators.required),
      pickupDate: new FormControl(date, Validators.required),
      returnDate: new FormControl(date, Validators.required),
    });
  }

  private getCurrentDate() {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  restrict(p: Event) {
    p.preventDefault();
  }
}

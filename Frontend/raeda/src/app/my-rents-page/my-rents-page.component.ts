import {Component, inject, OnInit} from '@angular/core';
import {RentalService} from "../shared/rental.service";
import {BrowserStorageService} from "../shared/browserStorage.service";
import {DashRental} from "../dashboard/dash-service-object";
import {NavbarComponent} from "../landing-page/navbar/navbar.component";
import {FooterComponent} from "../components/footer/footer.component";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RatingModule} from "primeng/rating";
import {MessageService} from "primeng/api";
import {ReviewReq} from "../shared/review-req";

@Component({
  selector: 'app-my-rents-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, DatePipe, RouterLink, DialogModule,
    DialogModule, FormsModule, ReactiveFormsModule, RatingModule],
  templateUrl: './my-rents-page.component.html',
  styleUrl: './my-rents-page.component.css'
})
export class MyRentsPageComponent implements OnInit {
  browserStorageService = inject(BrowserStorageService);
  rentalService = inject(RentalService);
  messageService = inject(MessageService);
  rents: DashRental[] | null = null;
  rentid = 0;
  visible = false;
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((user) => {
      if (user === null) return;
      this.rentalService.getUserRentals(user.email)?.subscribe(rents => this.rents = rents);
    });

    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      rating: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.messageService.add({severity: 'error', detail: "Start Selection Required"});
      return;
    }

    const user = this.browserStorageService.getUser();

    if (!user) return;

    const review = new ReviewReq(this.form.value['rating'], this.form.value['description'] ?? null, user.email, this.rentid);

    this.rentalService.postReview(review)?.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Thank you for your review! '
        });
        this.visible = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description ?? 'Unable to submit your review '
        });
      }
    });
  }

  onShowModal(id: number) {
    this.visible = true;
    this.rentid = id;
  }

  onHideModal() {
    this.form.reset();
  }

}

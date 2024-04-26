import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmPasswordValidator } from '../shared/confirm-password.validator';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  form: FormGroup = new FormGroup({});

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Congratulations',
        detail: 'Your account has been successfully created. ',
      });
      this.router.navigate(['/signin']);
    }

    console.log(this.form);
  }

  private initForm() {
    return new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),

        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: ConfirmPasswordValidator }
    );
  }
}

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
import { SignUpUser } from '../auth/signUpUser.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.form
      .get('confirmPassword')
      ?.statusChanges.subscribe((status) => console.log(status));
  }

  onSubmit() {
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    const email: string = this.form.get('email')?.value;
    const phoneNumber: string = this.form.get('phoneNumber')?.value;
    const password: string = this.form.get('password')?.value;

    const newUser = new SignUpUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );

    this.authService.signUp(newUser).subscribe({
      next: (e) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Congratulations',
          detail: 'Your account has been successfully created. ',
        });
        console.log(e);
        this.router.navigate(['/signin']);
      },
    });
  }

  private initForm() {
    return new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(null, [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]*$'),
        ]),

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

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../auth/auth.service';
import { SignInUser } from '../auth/signInUser.model';
import { BrowserStorageService } from '../browserStorage.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToastModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private browserStorageService: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  onSubmit() {
    const email: string = this.form.get('email')?.value;
    const password: string = this.form.get('password')?.value;

    const user = new SignInUser(email, password);
    this.authService.signIn(user).subscribe({
      next: (token) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Welcome back',
        });

        this.browserStorageService.saveTokenToStorage(
          this.form.get('rememberMe')?.value,
          token.accessToken
        );

        this.router.navigate(['/']);
      },
    });
  }

  private initForm() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      rememberMe: new FormControl(null),
    });
  }
}

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
    private router: Router
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
        if (this.form.get('rememberMe')?.value) {
          localStorage.setItem('token', JSON.stringify(token.accessToken));
        } else {
          sessionStorage.setItem('token', JSON.stringify(token.accessToken));
        }

        this.router.navigate(['/cars']);
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

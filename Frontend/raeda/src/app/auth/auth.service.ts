import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInUser } from './signInUser.model';
import { SignUpUser } from './signUpUser.model';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signIn(user: SignInUser) {
    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth',
      user
    );
  }

  signUp(newUser: SignUpUser) {
    return this.http.post('http://localhost:8080/api/user', newUser);
  }
}

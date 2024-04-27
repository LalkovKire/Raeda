import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInUser } from './signInUser.model';
import { SignUpUser } from './signUpUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(user: SignInUser) {
    return this.http.post<{ accessToken: string }>(
      'http://localhost:8080/api/auth',
      user
    );
  }

  signUp(newUser: SignUpUser) {
    return this.http.post('http://localhost:8080/api/user', newUser);
  }
}

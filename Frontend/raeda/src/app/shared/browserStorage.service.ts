import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../auth/login-response';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  isSignIn = new BehaviorSubject<LoginResponse | null>(null);
  router = inject(Router);
  authenticated = signal(false);

  autoSignIn() {
    const localStorageUser = localStorage.getItem('user') as string;
    const sessionStorageUser = sessionStorage.getItem('user') as string;
    
    if (localStorageUser || sessionStorageUser) {
      const user = localStorageUser
        ? JSON.parse(localStorageUser)
        : JSON.parse(sessionStorageUser);
      this.isSignIn.next(user);
      if (user.role === "ADMIN")
        this.authenticated.update(val => true);
      else this.authenticated.update(val => false);
    } else {
      this.isSignIn.next(null);
      this.authenticated.update(val => false);
    }
  }

  saveUserInfoInStorage(whereToSave: boolean, userInfo: LoginResponse) {
    const user = JSON.stringify(userInfo);
    
    if (whereToSave) {
      localStorage.setItem('user', user);
      localStorage.setItem('token', userInfo.accessToken);
    } else {
      sessionStorage.setItem('user', user);
      localStorage.setItem('token', userInfo.accessToken);
    }
    
    this.isSignIn.next(userInfo);
  }

  userAuthentication(user: LoginResponse) : void {
    if (user.role === "ADMIN")
      this.authenticated.update(val => true);
    else this.authenticated.update(val => false);
  }

  signOut() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.authenticated.update(val => false);
    this.isSignIn.next(null);
    this.router.navigateByUrl("/");
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from './auth/login-response';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  isSignIn = new BehaviorSubject<LoginResponse | null>(null);

  autoSignIn() {
    const localStorageUser = localStorage.getItem('user') as string;
    const sessionStorageUser = sessionStorage.getItem('user') as string;

    if (localStorageUser || sessionStorageUser) {
      const user = localStorageUser
        ? JSON.parse(localStorageUser)
        : JSON.parse(sessionStorageUser);
      this.isSignIn.next(user);
    } else {
      this.isSignIn.next(null);
    }
  }

  saveUserInfoInStorage(whereToSave: boolean, userInfo: LoginResponse) {
    const user = JSON.stringify(userInfo);

    if (whereToSave) {
      localStorage.setItem('user', user);
    } else {
      sessionStorage.setItem('user', user);
    }

    this.isSignIn.next(userInfo);
  }

  signOut() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.isSignIn.next(null);
  }
}

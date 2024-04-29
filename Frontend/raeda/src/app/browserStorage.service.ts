import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  isSignIn = new BehaviorSubject<boolean>(false);

  autoSignIn() {
    if (localStorage.getItem('token') || sessionStorage.getItem('token'))
      this.isSignIn.next(true);
    else this.isSignIn.next(false);
  }

  saveTokenToStorage(whereToSave: boolean, token: string) {
    token = JSON.stringify(token);

    if (whereToSave) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }

    this.isSignIn.next(true);
  }

  signOut() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.isSignIn.next(false);
  }
}

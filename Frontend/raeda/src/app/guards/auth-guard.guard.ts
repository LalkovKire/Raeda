import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BrowserStorageService } from '../shared/browserStorage.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(BrowserStorageService).authenticated() ? true : 
    inject(Router).createUrlTree(['/']);
};

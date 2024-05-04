import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BrowserStorageService } from '../shared/browserStorage.service';
import { map, take } from 'rxjs';

export const signInGuard: CanActivateFn = (route, state) => {
  const browserStorageService = inject(BrowserStorageService);
  const router = inject(Router);

  return browserStorageService.isSignIn.pipe(
    take(1),
    map((status) => {
      if (status) return router.createUrlTree(['/']);

      return true;
    })
  );
};

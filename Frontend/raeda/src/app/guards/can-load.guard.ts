import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {BrowserStorageService} from "../shared/browserStorage.service";
import {map, take} from "rxjs";

export const canLoadGuard: CanActivateFn = (route, state) => {
  const browserStorageService = inject(BrowserStorageService);
  const router = inject(Router);

  return browserStorageService.isSignIn.pipe(
    take(1),
    map((status) => {
      if (status) return true;

      return router.createUrlTree(['/']);
    })
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // ¡Igual que el otro guardián, lee el signal!
  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true; 
  }
};
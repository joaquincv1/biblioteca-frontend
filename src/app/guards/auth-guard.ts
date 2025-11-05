import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // ¡AQUÍ EL CAMBIO!
  // Antes: authService.isLoggedIn() (llamaba a un método)
  // Ahora: authService.isLoggedIn() (¡lee el valor del signal!)
  if (authService.isLoggedIn()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false;
  }
};
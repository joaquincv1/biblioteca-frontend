import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // ¡La lógica es al revés!
  if (authService.isLoggedIn()) {
    // Si ESTÁ logueado, llévalo al dashboard
    router.navigate(['/dashboard']);
    return false; // ¡Rechaza el acceso a /login!
  } else {
    // No está logueado, así que SÍ puede ver el login
    return true; 
  }
};
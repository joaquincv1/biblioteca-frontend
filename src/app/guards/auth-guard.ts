import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  // Inyectamos nuestros servicios (el nuevo estándar)
  const authService = inject(AuthService);
  const router = inject(Router);

  // Usamos el método que acabamos de crear
  if (authService.isLoggedIn()) {
    return true; // ¡Está logueado! Déjalo pasar.
  } else {
    // No está logueado. Redirigir al /login.
    router.navigate(['/login']);
    return false; // ¡Rechaza el acceso!
  }
};
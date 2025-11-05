import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // Inyectamos el AuthService
  const authService = inject(AuthService);
  const token = authService.getToken(); // Obtenemos el token de localStorage

  // Si el token existe...
  if (token) {
    // Clonamos la petición y añadimos el header 'Authorization'
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Formato "Bearer <token>"
      }
    });
    // Dejamos que la petición clonada (y modificada) continúe
    return next(clonedReq);
  }

  // Si no hay token, dejamos que la petición original continúe sin modificar
  return next(req);
};
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// 1. Importa StorageService
import { StorageService } from '../services/storage'; 

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 2. Inyecta StorageService
  const storageService = inject(StorageService); 
  const token = storageService.getToken(); // 3. Obtiene el token desde aquí

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  
  return next(req);
};
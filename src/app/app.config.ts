import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 1. Importa 'provideHttpClient' y 'withInterceptors'
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
// 2. Importa tu nuevo interceptor
import { jwtInterceptor } from './interceptors/jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 3. Modifica esta línea:
    // Antes: provideHttpClient()
    // Ahora:
    provideHttpClient(withInterceptors([
      jwtInterceptor // <-- Aquí le decimos a Angular que use tu interceptor
    ]))
  ]
};
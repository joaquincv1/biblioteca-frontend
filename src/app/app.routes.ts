import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard'; // <-- 1. Importa el guardia

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // 2. Añade el guardia a la ruta del dashboard
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard] // <-- ¡Aquí está la magia!
  },
  
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
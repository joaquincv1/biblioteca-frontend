import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard'; // <-- 1. Importa el guardia
import { loginGuard } from './guards/login-guard'; // <-- 1. Importa el nuevo guardia

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard] // <-- 2. Añade el guardia a /login
  },
  
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard] 
  },
  
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';
import { RegisterComponent } from './components/register/register'; // <-- 1. Importa

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard] 
  },
  // 2. Añade la ruta de registro (¡también protegida por loginGuard!)
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard] 
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
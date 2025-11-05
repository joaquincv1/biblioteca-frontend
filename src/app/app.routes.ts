import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login'; // <-- Importa tu componente

export const routes: Routes = [
    // Cuando alguien visite la ruta '/login', carga el LoginComponent
    { path: 'login', component: LoginComponent },

    // (Opcional) Redirige la ruta vacía (homepage) a /login
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
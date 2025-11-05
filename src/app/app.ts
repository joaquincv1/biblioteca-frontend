import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // <-- Importante para las rutas

@Component({
  selector: 'app-root', // El <app-root> en tu index.html
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet  // <-- Necesario para que <router-outlet> funcione
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Esta es la línea clave que tus 'main.ts' están buscando
  title = 'frontend-biblioteca'; 
}
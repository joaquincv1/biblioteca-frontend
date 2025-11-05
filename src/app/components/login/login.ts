import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// ¡Importaciones clave para Formularios Reactivos!
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'; 

import { AuthService } from '../../services/auth'; // Importa tu servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // <--- 1. Añade esto a los imports
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup; // Esta variable contendrá nuestro formulario

  // 2. Inyectamos el FormBuilder y nuestro AuthService
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // 3. Definimos la estructura del formulario y sus validaciones
    this.loginForm = this.fb.group({
      // El campo 'email' es obligatorio y debe tener formato de email
      email: ['', [Validators.required, Validators.email]],
      // El campo 'password' es obligatorio
      password: ['', [Validators.required]]
    });
  }

  // 4. Este método se llamará cuando el formulario se envíe
  onSubmit() {
    if (this.loginForm.invalid) {
      // Si el formulario no es válido, no hagas nada (o muestra un error)
      return;
    }

    console.log('Enviando formulario:', this.loginForm.value);

    // 5. Usamos nuestro servicio para enviar los datos a la API
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        // ¡Éxito!
        console.log('¡Login exitoso!', response);
        // 'response' aquí contiene el token que nos envió el backend
        // (En el próximo paso, guardaremos este token)
      },
      (error) => {
        // Error
        console.error('Error en el login:', error);
        // (Aquí mostraremos un mensaje de error al usuario)
      }
    );
  }
}
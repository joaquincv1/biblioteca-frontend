import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importa todo lo de Formularios Reactivos
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  // 2. Añade ReactiveFormsModule
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null; // Para mostrar errores

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // ¡AÑADE ESTA LÍNEA!
      // Lo inicializamos como 'student' por defecto
      role: ['student', [Validators.required]] 
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return; // No envíes si el formulario es inválido
    }

    this.errorMessage = null; // Resetea el error

    // 4. Llama al nuevo método 'register' del servicio
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('¡Registro exitoso!', response);
        // 5. ¡Auto-Login exitoso! Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error en el registro:', error);
        // (Ej. "El usuario ya existe")
        this.errorMessage = error.error?.message || 'Error en el registro. Intente de nuevo.';
      }
    );
  }
}
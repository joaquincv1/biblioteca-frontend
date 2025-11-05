import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- ¡Asegúrate de que RouterLink esté aquí!
import { AuthService } from '../../services/auth';

// --- ¡Importa los módulos de Material! ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <-- ¡Uno nuevo para el Rol!

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, // <-- ¡Añade esto si te faltaba!
    
    // --- ¡Añádelos aquí! ---
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule // <-- Y este
  ],
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
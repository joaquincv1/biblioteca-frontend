import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router'; // <--- 1. Importa el Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // <--- 2. Inyecta el Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    
    console.log('Enviando formulario:', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('¡Login exitoso!', response);
        
        // ¡ÉXITO! El token ya se guardó (gracias al 'tap' en el servicio)
        // 3. Ahora redirigimos al dashboard
        this.router.navigate(['/dashboard']); 

      },
      (error) => {
        console.error('Error en el login:', error);
        // (Aquí deberíamos mostrar un mensaje de error al usuario, ej. "Email o pass incorrecto")
      }
    );
  }
}
import { Injectable, signal } from '@angular/core'; // <-- 1. Importa 'signal'
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router'; // <-- Importa el Router para el logout

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';

  // 2. ¡EL CAMBIO CLAVE!
  // Creamos un signal. Lo inicializamos leyendo de localStorage
  // para que el estado persista si refrescas la página.
  public isLoggedIn = signal<boolean>(!!this.getToken());

  constructor(private http: HttpClient, private router: Router) { } // Inyecta el Router

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
        // 3. Actualizamos el signal a 'true'
        this.isLoggedIn.set(true); 
      })
    );
  }

  // --- Métodos de Gestión del Token ---
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // 4. Actualizamos el signal a 'false'
    this.isLoggedIn.set(false);
    // Y redirigimos al login
    this.router.navigate(['/login']);
  }

  // 5. ¡YA NO NECESITAMOS EL MÉTODO isLoggedIn()!
  // Lo borramos, porque ahora los guardianes leerán el signal directamente.
}
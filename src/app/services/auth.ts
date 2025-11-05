import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // <-- Importa 'tap'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token'; // Clave para guardar en localStorage

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      // 'tap' nos permite "espiar" la respuesta sin modificarla
      tap((response: any) => {
        // ¡Guardamos el token en localStorage!
        this.saveToken(response.token);
      })
    );
  }

  // --- Métodos de Gestión del Token ---

  // Guardar el token
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Cerrar sesión (borrar el token)
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // (Aquí también redirigiremos al login)
  }
  
  isLoggedIn(): boolean {
    const token = this.getToken();
    // (Más adelante, podríamos decodificar el token para ver si ha expirado)
    return !!token; // Devuelve 'true' si el token existe, 'false' si no
  }
}
  // (Más adelante añadiremos un método 'isLoggedIn' aquí)


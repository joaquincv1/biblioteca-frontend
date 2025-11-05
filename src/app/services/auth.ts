import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // <-- Importa tu entorno

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usamos la apiUrl de nuestros archivos de entorno
  private apiUrl = `${environment.apiUrl}/auth`; 

  constructor(private http: HttpClient) { }

  // Método para el Login
  // Recibe 'credentials' (un objeto {email, password})
  // Devuelve un Observable (un flujo de datos) con la respuesta de la API
  login(credentials: any): Observable<any> {
    // Hacemos un POST a 'http://localhost:3000/api/auth/login'
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // (Aquí pondremos register(), logout(), etc. más adelante)
}
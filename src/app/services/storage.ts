import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Limpia todo el localStorage
  clean(): void {
    window.localStorage.clear();
  }

  // --- Métodos para el Token ---
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  // --- Métodos para el Usuario ---
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    // localStorage solo guarda strings, así que convertimos el objeto a JSON
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      // Reconvertimos el string JSON a un objeto de JavaScript
      return JSON.parse(user);
    }
    return null;
  }
}
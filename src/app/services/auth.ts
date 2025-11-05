import { Injectable, signal, computed } from '@angular/core'; // 1. Importa 'computed'
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from './storage'; // 2. Importa StorageService

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  // --- SIGNALS PARA EL ESTADO ---
  
  // 1. CAMBIO AQUÍ: Inicializa el signal como 'null' por ahora.
  public currentUser = signal<any | null>(null); 
  
  // (Estas líneas están perfectas, se basan en currentUser)
  public isLoggedIn = computed(() => !!this.currentUser());
  public userRole = computed(() => this.currentUser()?.role); 
  // ------------------------------

  constructor(
    private http: HttpClient, 
    private router: Router,
    private storageService: StorageService 
  ) { 
    // 2. ¡AQUÍ ESTÁ LA SOLUCIÓN!
    // Ahora que storageService SÍ existe, leemos el valor 
    // y actualizamos el signal.
    this.currentUser.set(this.storageService.getUser());
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // 7. Usamos StorageService para guardar TODO
        this.storageService.saveToken(response.token);
        this.storageService.saveUser(response); // Guarda el objeto { _id, name, email, role, token }

        // 8. Actualizamos el signal del usuario. ¡Los otros signals (isLoggedIn, userRole) se actualizarán solos!
        this.currentUser.set(response);
      })
    );
  }

  register(userData: any): Observable<any> {
    // Llama al endpoint de registro que ya creamos en el backend
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        // ¡Auto-Login! Si el registro es exitoso,
        // guardamos el token y los datos del nuevo usuario.
        this.storageService.saveToken(response.token);
        this.storageService.saveUser(response);

        // Actualizamos el signal. ¡La app ahora sabe que está logueado!
        this.currentUser.set(response);
      })
    );
  }

  logout(): void {
    // 9. Usamos StorageService para limpiar todo
    this.storageService.clean();
    
    // 10. Actualizamos el signal.
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // ¡Ya no necesitamos los métodos getToken() o saveToken() aquí!
  // ¡Y tampoco necesitamos isLoggedIn()! Los signals lo manejan todo.
}
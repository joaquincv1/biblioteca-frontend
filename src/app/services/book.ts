import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Nota: esta vez la URL apunta a '/books'
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) { }

  // Método para obtener TODOS los libros
  getBooks(): Observable<any> {
    // ¡No necesitamos poner headers de autorización aquí!
    // El JWT-INTERCEPTOR lo hará automáticamente por nosotros.
    // Esta es la magia de los interceptors.
    return this.http.get(this.apiUrl);
  }
  // Método para CREAR un nuevo libro
createBook(bookData: any): Observable<any> {
  // No necesitamos headers, ¡el JwtInterceptor lo hace por nosotros!
  // Esto llamará a POST /api/books
  return this.http.post(this.apiUrl, bookData);
}
  // (Aquí pondremos getBookById(), createBook(), etc. más adelante)
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa la URL base

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Asegúrate de que esta URL es correcta, terminando en /books
  private apiUrl = `${environment.apiUrl}/books`; 

  constructor(private http: HttpClient) { }

  /**
   * 1. READ: Obtiene todos los libros.
   * La seguridad es manejada por el token JWT.
   */
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * 2. CREATE: Crea un nuevo libro (Solo Admin).
   */
  createBook(bookData: any): Observable<any> {
    return this.http.post(this.apiUrl, bookData);
  }

  /**
   * 3. UPDATE: Actualiza un libro por su ID (Solo Admin).
   * @param bookId El ID único del libro (ej. el _id de Mongoose).
   * @param bookData Los datos a actualizar ({title, author, isbn}).
   */
  updateBook(bookId: string, bookData: any): Observable<any> {
    // Usa PUT para actualizar en la ruta /api/books/:bookId
    return this.http.put(`${this.apiUrl}/${bookId}`, bookData);
  }

  /**
   * 4. DELETE: Elimina un libro por su ID (Solo Admin).
   * @param bookId El ID único del libro (ej. el _id de Mongoose).
   */
  deleteBook(bookId: string): Observable<any> {
    // Usa DELETE para eliminar en la ruta /api/books/:bookId
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }
}
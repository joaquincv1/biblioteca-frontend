import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = `${environment.apiUrl}/loans`; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  // Obtener los préstamos del usuario actual
  getMyLoans(): Observable<any[]> {
    // Si tu ruta en el backend es '/my', asegúrate de que el frontend la use
    return this.http.get<any[]>(`${this.apiUrl}/my`); // <--- ¡Asegúrate de que sea /my !
  }

  // Crear una solicitud de préstamo
  requestLoan(bookId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request`, { bookId });
  }

  // Marcar un préstamo como devuelto (para admin)
  returnLoan(loanId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${loanId}/return`, {});
  }

  // Obtener todos los préstamos (para admin)
  getAllLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
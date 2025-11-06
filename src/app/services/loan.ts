import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/api/loans'; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  // Obtener los préstamos del usuario actual
  getMyLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-loans`);
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
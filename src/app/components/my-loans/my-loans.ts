import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatTableModule, 
    MatButtonModule, 
    MatProgressSpinnerModule
  ], 
  templateUrl: './my-loans.html',
  styleUrl: './my-loans.css'
})
export class MyLoansComponent implements OnInit {
  
  loans: any[] = [];
  loading: boolean = true;
  
  displayedColumns: string[] = ['title', 'author', 'loanDate', 'dueDate', 'status', 'action']; 

  constructor(
    private loanService: LoanService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMyLoans();
  }

  /**
   * Llama al servicio para obtener los préstamos del usuario actual.
   */
  loadMyLoans(): void {
    this.loading = true;
    this.loanService.getMyLoans().subscribe({
      next: (data: any[]) => {
        this.loans = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error cargando préstamos:', err);
        this.loading = false;
        alert('Error al cargar tu historial de préstamos.');
      }
    });
  }
  
  /**
   * Maneja el proceso de devolución de un libro.
   */
  onReturn(loanId: string, bookTitle: string): void {
    if (!confirm(`¿Estás seguro de marcar como DEVUELTO el libro "${bookTitle}"?`)) {
      return;
    }
    
    this.loanService.returnLoan(loanId).subscribe({
      next: () => {
        alert(`"${bookTitle}" ha sido marcado como devuelto.`);
        this.loadMyLoans();
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al procesar la devolución. Inténtalo de nuevo.');
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // <-- AGREGA ESTO
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoanService } from '../../services/loan';

// Importaciones de Servicios
import { BookService } from '../../services/book';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule // <-- AGREGA ESTO
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit { 

  books: any[] = [];
  loading: boolean = true;
  
  // --- VARIABLES DE CREACIÓN ---
  showCreateForm: boolean = false;
  bookForm: FormGroup;
  createError: string | null = null; 

  // --- VARIABLES DE EDICIÓN ---
  editingBook: any | null = null;
  editForm: FormGroup;
  editError: string | null = null;

  // 1. INICIALIZACIÓN DE SERVICIOS Y FORMULARIOS
  constructor(
    private bookService: BookService, 
    public authService: AuthService,
    private fb: FormBuilder,
    private loanService: LoanService, 
    private snackBar: MatSnackBar,
    private router: Router // <-- AGREGA ESTO
  ) {
    // 2. Definición del formulario de CREACIÓN
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    });

    // 3. Definición del formulario de EDICIÓN
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }
  
  // --- MÉTODOS DE LECTURA (READ) ---
  loadBooks(): void {
    this.loading = true;

    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los libros:', err);
        this.loading = false;
      }
    });
  }

  // --- MÉTODOS DE CREACIÓN (CREATE) ---
  onSubmitCreateBook(): void {
    if (this.bookForm.invalid) return;

    this.createError = null;

    this.bookService.createBook(this.bookForm.value).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.bookForm.reset();
        this.loadBooks();
      },
      error: (error) => {
        this.createError = error.error?.message || 'Error desconocido al crear el libro.';
      }
    });
  }
  
  // --- MÉTODOS DE EDICIÓN (UPDATE) ---
  onEdit(book: any): void {
    this.editError = null;
    this.showCreateForm = false;
    this.editingBook = book;
    
    this.editForm.setValue({ 
      title: book.title,
      author: book.author,
      isbn: book.isbn
    });
  }

  onSubmitEditBook(): void {
    if (this.editForm.invalid || !this.editingBook) return;
    
    this.editError = null;

    this.bookService.updateBook(this.editingBook._id, this.editForm.value).subscribe({
      next: () => {
        this.editingBook = null;
        this.loadBooks();
      },
      error: (error) => {
        this.editError = error.error?.message || 'Error al actualizar el libro.';
      }
    });
  }

  // --- MÉTODOS DE ELIMINACIÓN (DELETE) ---
  onDelete(bookId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar el libro: ' + err.error?.message);
        }
      });
    }
  }

  // --- MÉTODO DE SOLICITUD DE PRÉSTAMO ---
  onLoanRequest(bookId: string, bookTitle: string): void {
    if (!confirm(`¿Estás seguro de solicitar el préstamo de "${bookTitle}"?`)) {
      return;
    }

    this.loanService.requestLoan(bookId).subscribe({
      next: (response) => {
        this.snackBar.open(`¡Préstamo de ${bookTitle} exitoso! Devuélvelo en 14 días.`, 'OK', { duration: 5000 });
        this.loadBooks();
      },
      error: (err) => {
        const msg = err.error?.message || 'Error desconocido al solicitar préstamo.';
        this.snackBar.open(`FALLÓ: ${msg}`, 'Cerrar', { duration: 7000 });
      }
    });
  }

  // --- MÉTODO DE NAVEGACIÓN A MIS PRÉSTAMOS ---
  goToMyLoans(): void {
    this.router.navigate(['/dashboard/my-loans']);
  }
  goToDashboard(): void {
    // El 'router' ya está inyectado en el constructor
    this.router.navigate(['/dashboard']); 
  }
}

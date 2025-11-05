import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importaciones de Formularios Reactivos y Material Design
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Importaciones de Servicios
import { BookService } from '../../services/book'; // Asegúrate de que la ruta sea correcta
import { AuthService } from '../../services/auth'; // Asegúrate de que la ruta sea correcta

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
    MatFormFieldModule, // Necesario para los formularios
    MatInputModule // Necesario para los formularios
  ],
  templateUrl: './dashboard.html', // Corregido a .component.html
  styleUrl: './dashboard.css' // Corregido a .component.css
})
export class DashboardComponent implements OnInit { 

  books: any[] = [];
  loading: boolean = true;
  
  // --- VARIABLES DE CREACIÓN ---
  showCreateForm: boolean = false;
  bookForm: FormGroup;
  createError: string | null = null; 

  // --- VARIABLES DE EDICIÓN ---
  editingBook: any | null = null; // Almacena el libro seleccionado
  editForm: FormGroup; // Formulario reactivo de edición
  editError: string | null = null; // Error de edición

  // 1. INICIALIZACIÓN DE SERVICIOS Y FORMULARIOS
  constructor(
    private bookService: BookService, 
    public authService: AuthService,
    private fb: FormBuilder // Inyecta FormBuilder
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
      next: (data) => { // Usando sintaxis next/error para claridad
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los libros:', err);
        this.loading = false;
        // Si hay error (ej. 401), la lista queda vacía.
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
        this.loadBooks(); // Refresca la lista
      },
      error: (error) => {
        this.createError = error.error?.message || 'Error desconocido al crear el libro.';
      }
    });
  }
  
  // --- MÉTODOS DE EDICIÓN (UPDATE) ---

  onEdit(book: any): void {
    this.editError = null;
    this.showCreateForm = false; // Oculta el de creación
    this.editingBook = book; // Establece el libro a editar
    
    // Carga los valores actuales del libro en el formulario
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
        this.editingBook = null; // Oculta el formulario de edición
        this.loadBooks(); // Vuelve a cargar la lista
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
          this.loadBooks(); // Vuelve a cargar la lista para quitar el eliminado
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar el libro: ' + err.error?.message);
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
// 1. Importa CommonModule Y ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { BookService } from '../../services/book';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 2. Añade ReactiveFormsModule a los imports
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit { 

  books: any[] = [];
  loading: boolean = true;

  // 3. Nuevas variables para el formulario
  showCreateForm: boolean = false; // Para mostrar/ocultar el formulario
  bookForm: FormGroup; // Para el formulario reactivo
  createError: string | null = null; // Para mostrar errores

  constructor(
    private bookService: BookService, 
    public authService: AuthService,
    private fb: FormBuilder // 4. Inyecta el FormBuilder
  ) {
    // 5. Define el formulario de creación de libros
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

loadBooks(): void {
  this.loading = true; // <-- Se pone en 'true' (¡esto está bien!)

  this.bookService.getBooks().subscribe(
    (data) => {
      this.books = data; // Guarda los libros
      this.loading = false; // <-- ¡Se pone en 'false' al terminar!
      console.log('¡Libros cargados exitosamente!', this.books);
    },
    (error) => {
      console.error('Error al cargar los libros:', error);
      this.loading = false; // <-- ¡También se pone en 'false' si hay error!
    }
  );
}

  // 6. NUEVO MÉTODO: Se llama cuando se envía el formulario de libro
  onSubmitCreateBook(): void {
    if (this.bookForm.invalid) {
      return; // No hacer nada si el formulario es inválido
    }

    this.createError = null; // Limpia errores antiguos

    this.bookService.createBook(this.bookForm.value).subscribe(
      (newBook) => {
        console.log('¡Libro creado!', newBook);
        this.showCreateForm = false; // Oculta el formulario
        this.bookForm.reset(); // Limpia el formulario

        // ¡MUY IMPORTANTE!
        // Vuelve a cargar la lista de libros para que el nuevo aparezca
        this.loadBooks(); 
      },
      (error) => {
        console.error('Error al crear el libro:', error);
        this.createError = error.error?.message || 'Error desconocido al crear el libro.';
      }
    );
  }
}
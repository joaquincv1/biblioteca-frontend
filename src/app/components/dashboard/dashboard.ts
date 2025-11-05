import { Component, OnInit } from '@angular/core'; // 1. Importa OnInit
import { CommonModule } from '@angular/common'; // 2. Importa CommonModule
import { BookService } from '../../services/book'; // 3. Importa tu nuevo servicio

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // 4. Añade CommonModule (para usar *ngFor)
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit { // 5. Implementa OnInit

  books: any[] = []; // 6. Una variable para guardar la lista de libros
  loading: boolean = true; // (Opcional) para mostrar un mensaje de carga

  // 7. Inyecta el BookService en el constructor
  constructor(private bookService: BookService) { }

  // 8. ngOnInit se ejecuta automáticamente cuando el componente se carga
  ngOnInit(): void {
    this.loadBooks();
  }

  // 9. Llama al servicio para obtener los libros
  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data; // Guarda los libros en la variable
        this.loading = false;
        console.log('¡Libros cargados exitosamente!', this.books);
      },
      (error) => {
        console.error('Error al cargar los libros:', error);
        // Si ves un error 401 aquí, ¡significa que tu Interceptor falló!
        this.loading = false;
      }
    );
  }
}
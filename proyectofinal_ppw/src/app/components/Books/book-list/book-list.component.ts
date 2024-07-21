import { CommonModule, Location} from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BookInterface } from '../../Books/book.interface';
import { BauthService } from '../../../servicesBook/bauth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'] // Asegúrate de usar 'styleUrls' en lugar de 'styleUrl'
})
export class BookListComponent implements OnInit {
  location = inject(Location)
  bauthService = inject(BauthService); // Servicio para manejar libros
  books: BookInterface[] = []; // Array para almacenar la lista de libros
  errorMessage: string | null = null; // Mensaje de error

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBooks(); // Carga los libros al inicializar el componente
  }

  // Función para cargar los libros desde el servicio
  loadBooks() {
    this.bauthService.getBooks().subscribe(
      (books) => {
        this.books = books; // Almacena los libros en la variable
      },
      (error) => {
        this.errorMessage = 'Error fetching books. Please try again later.'; // Muestra mensaje de error
      }
    );
  }

  // Función para editar un libro
  editBook(book: BookInterface) {
    this.router.navigate(['/edit-book'], { state: { book } }); // Navega al componente de edición pasando el libro
  }

  // Función para eliminar un libro
  deleteBook(author: string) {
    this.bauthService.deleteBook(author).subscribe(
      () => {
        this.loadBooks(); // Vuelve a cargar la lista de libros después de eliminar
      },
      (error) => {
        this.errorMessage = 'Error deleting book. Please try again later.'; // Muestra mensaje de error
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
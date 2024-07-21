import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../../servicesBook/bauth.service';
import { BookInterface } from '../../Books/book.interface';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'] // Asegúrate de usar 'styleUrls' en lugar de 'styleUrl'
})
export class BookDetailsComponent implements OnInit {
  books: BookInterface[] = []; // Array para almacenar la lista de libros

  constructor(private authService: BauthService) {}

  ngOnInit() {
    this.fetchBooks(); // Llama a la función para obtener los libros al iniciar el componente
  }

  // Función para obtener los libros desde el servicio
  fetchBooks() {
    this.authService.getBooks().subscribe(
      (books: BookInterface[]) => {
        this.books = books; // Almacena los libros en la variable
      },
      (error) => {
        console.error('Error fetching books:', error); // Muestra un error en la consola si ocurre uno
      }
    );
  }

  // Función para solicitar un préstamo de libro (implementación pendiente)
  requestLoan(bookId: number) {
    console.log(`Request loan for book with ID ${bookId}`);
    // Implementa la lógica para solicitar un préstamo aquí
  }

  // Función para volver a la pantalla anterior
  goBack() {
    console.log('Going back to dashboard');
    // Implementa la lógica para volver aquí
  }
}
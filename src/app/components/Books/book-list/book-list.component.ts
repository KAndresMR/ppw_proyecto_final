import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
books: any;

  editBook(bookId: number) {
    // Lógica para editar el libro con el ID proporcionado
    console.log(`Edit book with ID ${bookId}`);
  }


  deleteBook(bookId: number) {
    // Lógica para eliminar el libro con el ID proporcionado
    console.log(`Delete book with ID ${bookId}`);
  }

}

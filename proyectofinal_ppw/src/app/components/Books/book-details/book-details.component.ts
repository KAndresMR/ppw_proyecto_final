import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  book = {
    id: 1,
    title: 'Book Title',
    author: 'Author Name',
    genre: 'Genre',
    description: 'Description of the book'
  };

  requestLoan(bookId: number) {
    console.log(`Request loan for book with ID ${bookId}`);
  }

  goBack() {
    console.log('Going back to dashboard');
  }
}

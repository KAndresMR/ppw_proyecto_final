import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  location = inject(Location)

  books = [
    { id: 1, title: 'Book One', author: 'Author One' },
    { id: 2, title: 'Book Two', author: 'Author Two' }
  ];

  users = [
    { id: 1, name: 'User One', email: 'userone@example.com' },
    { id: 2, name: 'User Two', email: 'usertwo@example.com' }
  ];



  editBook(bookId: number) {
    console.log(`Edit book with ID ${bookId}`);
  }

  deleteBook(bookId: number) {
    console.log(`Delete book with ID ${bookId}`);
  }

  editUser(userId: number) {
    console.log(`Edit user with ID ${userId}`);
  }

  goBack() {
    this.location.back();
  }

}

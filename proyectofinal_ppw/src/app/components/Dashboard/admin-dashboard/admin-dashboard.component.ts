import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BauthService } from '../../../servicesBook/bauth.service';
import { BookInterface } from '../../Books/book.interface';
import { UserInterface } from '../../Register//user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  location = inject(Location);
  bauthService = inject(BauthService);
  authService = inject(AuthService);
  books: BookInterface[] = [];
  users: UserInterface[] = [];
  errorMessage: string | null = null;

  ngOnInit() {
    this.bauthService.getBooks().subscribe(
      (books) => {
        this.books = books;
        
      },
      (error) => {
        this.errorMessage = 'Error fetching books. Please try again later.';
      }
    );

    this.authService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        this.errorMessage = 'Error fetching users. Please try again later.';
      }
    );
  }


  goBack() {
    this.location.back();
  }
}
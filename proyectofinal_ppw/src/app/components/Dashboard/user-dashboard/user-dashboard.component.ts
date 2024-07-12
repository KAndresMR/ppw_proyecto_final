import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  location = inject(Location)
  // Define las propiedades que se utilizan en el HTML
  username: string = 'John Doe';
  email: string = 'johndoe@example.com';
  users: Array<{ id: number, name: string, email: string }> = [
    { id: 1, name: 'User One', email: 'userone@example.com' },
    { id: 2, name: 'User Two', email: 'usertwo@example.com' }
  ];

  // Define los métodos que se utilizan en el HTML
  editProfile() {
    console.log('Edit profile clicked');
  }

  logout() {
    console.log('Logout clicked');
  }

  viewDetails(userId: number) {
    console.log(`View details for user ${userId}`);
  }

  goBack() {
    this.location.back();
  }
}

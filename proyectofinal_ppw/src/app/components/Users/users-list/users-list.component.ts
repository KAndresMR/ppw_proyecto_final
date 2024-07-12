import { Component, inject} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  location = inject(Location)
  users = [
    { name: 'Usuario 1', email: 'usuario1@example.com' },
    { name: 'Usuario 2', email: 'usuario2@example.com' },
    { name: 'Usuario 3', email: 'usuario3@example.com' },
    // Puedes agregar más usuarios aquí
  ];

  editUser(user: any) {
    console.log('Editar usuario', user);
    // Aquí puedes agregar la lógica para editar el usuario
  }



  goBack() {
    this.location.back();
  }


}

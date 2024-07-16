import { Component, inject} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

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

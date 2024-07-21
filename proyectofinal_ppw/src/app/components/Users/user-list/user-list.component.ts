import { Component, inject, OnInit} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserInterface } from '../../Register/user.interface';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  location = inject(Location)
  aauthService = inject(AuthService); // Servicio para manejar libros
  users: UserInterface[] = []; // Array para almacenar la lista de libros
  errorMessage: string | null = null; // Mensaje de error


  constructor(private router: Router) {}


  editUser(user: UserInterface) {
    this.router.navigate(['/user-profile'], { state: { user } }); // Navega al componente de edición pasando el libro
    
  }
  // Función para cargar los usuarios desde el servicio
  loadUsers() {
    this.aauthService.getUsers().subscribe(
      (users) => {
        this.users = users; // Almacena los usuarios en la variable
      },
      (error) => {
        this.errorMessage = 'Error fetching users. Please try again later.'; // Muestra mensaje de error
      }
    );
  }

  ngOnInit() {
    this.loadUsers(); // Carga los usuarios al inicializar el componente
  }



  goBack() {
    this.location.back();
  }


}

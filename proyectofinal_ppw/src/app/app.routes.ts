import { Routes } from '@angular/router';

// Importa los componentes para las rutas
import { LoginComponent } from './components/Login/login.component';
import { RegisterComponent } from './components/Register/register.component';

// Importa componentes relacionados con libros
import { AddBookComponent } from './components/Books/add-book/add-book.component';
import { BookDetailsComponent } from './components/Books/book-details/book-details.component';
import { BookListComponent } from './components/Books/book-list/book-list.component';
import { EditBookComponent } from './components/Books/edit-book/edit-book.component';

// Importa componentes para los dashboards
import { UserDashboardComponent } from './components/Dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/Dashboard/admin-dashboard/admin-dashboard.component';

// Importa componentes relacionados con usuarios
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { UserProfileComponent } from './components/Users/user-profile/user-profile.component';

// Define las rutas de la aplicación
export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Ruta para el inicio de sesión
    { path: 'register', component: RegisterComponent }, // Ruta para el registro de usuario

    { path: 'add-book', component: AddBookComponent }, // Ruta para agregar un libro
    { path: 'book-details', component: BookDetailsComponent }, // Ruta para ver detalles de un libro
    { path: 'book-list', component: BookListComponent }, // Ruta para la lista de libros
    { path: 'edit-book', component: EditBookComponent }, // Ruta para editar un libro

    { path: 'user-dashboard', component: UserDashboardComponent }, // Ruta para el dashboard del usuario
    { path: 'admin-dashboard', component: AdminDashboardComponent }, // Ruta para el dashboard del administrador

    { path: 'user-list', component: UserListComponent }, // Ruta para la lista de usuarios
    { path: 'user-profile', component: UserProfileComponent }, // Ruta para el perfil del usuario
];
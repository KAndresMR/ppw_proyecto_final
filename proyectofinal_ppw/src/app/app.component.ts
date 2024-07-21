import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'proyectofinal_ppw'; // Título de la aplicación
  authService = inject(AuthService); // Servicio de autenticación inyectado

  currentRoute: string = ''; // Ruta actual para la lógica de navegación

  constructor(private router: Router) {
    // Suscribe a los eventos de navegación para actualizar la ruta actual
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Guarda la URL de la ruta actual
      }
    });
  }

  ngOnInit(): void {
    // Suscribe al observable de usuario autenticado
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        // Si hay un usuario autenticado, actualiza el estado del usuario
        this.authService.currentUserSig.set({
          uid: user.uid,
          email: user.email!,
          username: user.displayName!,
          password: user.displayName!,
          isAdmin: user.isAnonymous,
        });
      } else {
        // Si no hay usuario autenticado, establece el estado del usuario como null
        this.authService.currentUserSig.set(null);
      }
    });
  }

  // Método para manejar el cierre de sesión (aún no implementado)
  logout(): void {
    console.log('logout');
  }

  // Verifica si la ruta actual es una de las rutas de autenticación
  isAuthRoute(): boolean {
    return this.currentRoute === '/login' || 
      this.currentRoute === '/register' || 
      this.currentRoute === '/admin-dashboard' ||
      this.currentRoute === '/user-dashboard' ||
      this.currentRoute === '/add-book' ||
      this.currentRoute === '/book-details' ||
      this.currentRoute === '/book-list' || 
      this.currentRoute === '/edit-book' ||
      this.currentRoute === '/user-list' ||
      this.currentRoute === '/user-profile';
  }
}
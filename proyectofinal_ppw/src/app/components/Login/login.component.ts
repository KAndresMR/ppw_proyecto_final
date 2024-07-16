import { Component, inject} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);


  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    // Extraemos los valores del formulario
    const { email, password } = this.form.value;
    if (email && password) {
      // Iniciamos sesión en Firebase
      this.authService.login(email, password).subscribe({
        next: () => {
          // Verificamos si el usuario es administrador
          this.authService.getUserData().subscribe((userData) => {
            
            if (userData && userData.isAdmin) {
              // Si es administrador, redireccionamos al panel de administrador
              this.router.navigateByUrl('/admin-dashboard');
            } else {
              // Si no es administrador, redireccionamos al panel de usuario normal
              this.router.navigateByUrl('/user-dashboard');
            }
          });
        },
        error: (err) => {
          // Manejamos errores de inicio de sesión
          this.errorMessage = err.message; // Mostramos el mensaje de error
        },
      });
    }
  }




/*

  onSubmit(): void {

    const adminEmail = 'morochoandres12@gmail.com'; // Correo electrónico del administrador
    const adminPassword = '123456'; // Contraseña del administrador

    const rawForm = this.form.getRawValue()
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
          this.authService.getUserData().subscribe((userdata) =>{
            if (userdata && userdata.isAdmin) {
              this.router.navigateByUrl('/admin-dashboard'); 
            } else {
              this.router.navigateByUrl('/user-dashboard'); 
            }


          })
          
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }

  */

}

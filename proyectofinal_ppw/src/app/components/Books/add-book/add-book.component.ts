import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BauthService } from '../../../servicesBook/bauth.service';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookInterface } from '../../Books/book.interface';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {

  // Inyección de dependencias
  location = inject(Location); // Para navegación en el historial
  fb = inject(FormBuilder); // Para construir el formulario reactivo
  http = inject(HttpClient); // Para realizar solicitudes HTTP (aunque no se usa aquí)
  bauthService = inject(BauthService); // Servicio para gestionar libros
  router = inject(Router); // Para redirección

  // Inicialización del formulario reactivo con validaciones
  form = this.fb.nonNullable.group({
    title: ['', Validators.required], // Campo para el título del libro
    author: ['', Validators.required], // Campo para el autor del libro
    genre: ['', Validators.required], // Campo para el género del libro
    publicationYear: ['', Validators.required], // Campo para el año de publicación
  });

  errorMessage: string | null = null; // Mensaje de error (no se usa aquí)
  message: { success: boolean, text: string } | null = null; // Mensaje de éxito o error

  // Método para guardar el libro
  saveBook(): void {
    if (this.form.valid) { // Verifica si el formulario es válido
      console.log(this.form.value); // Imprime los valores del formulario para depuración

      // Crea un objeto BookInterface con los datos del formulario
      const bookData: BookInterface = {
        uid:'',
        title: this.form.get('title')!.value,
        author: this.form.get('author')!.value,
        publicationYear: this.form.get('publicationYear')!.value,
        genre: this.form.get('genre')!.value
      };

      // Llama al servicio para agregar el libro y maneja la respuesta
      this.bauthService.addBook(bookData).subscribe(
        (result) => {
          this.message = { success: result.success, text: result.message }; // Muestra el mensaje de éxito
          if (result.success) {
            this.router.navigateByUrl('/books-list'); // Redirige a la lista de libros tras añadir el libro
          }
        },
        (error) => {
          this.message = { success: false, text: 'Error al agregar el libro: ' + error.message }; // Muestra el mensaje de error
        }
      );
    }
  }

  // Método para cancelar la operación y volver a la página anterior
  cancel() {
    this.location.back();
  }
}
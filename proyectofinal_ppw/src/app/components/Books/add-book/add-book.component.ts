import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BauthService } from '../../../servicesBook/bauth.service';
import { Location } from '@angular/common';
import { Router, RouterLink} from '@angular/router';
import { BookInterface } from '../../Books/book.interface';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {

  location = inject(Location)
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  bauthService = inject(BauthService)
  router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: ['', Validators.required],
    publicationYear: ['', Validators.required],
  });

  saveBook(): void {

    if(this.form.valid){

    }
    console.log(this.form.value)    
    const bookData: BookInterface = {
      title: this.form.get('title')!.value,
      author: this.form.get('author')!.value,
      publicationYear: this.form.get('publicationYear')!.value,
      genre: this.form.get('genre')!.value
    };
    console.log('Datos del bookdata',bookData);
    this.bauthService.addBook(bookData).subscribe(
      () => {
        // Manejar el éxito, por ejemplo, mostrar un mensaje de éxito o redireccionar a otra página
        console.log('El libro se ha agregado exitosamente.');
      },
      error => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al agregar el libro:', error);
      }
    );
  }

  cancel() {
    this.location.back();
  }
}
import { Injectable, inject, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { getFirestore, doc, addDoc, collection, getDocs, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { BookInterface } from '../../app/components/Books/book.interface';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BauthService {

  // Inyección de dependencias para Firebase Authentication
  firebaseAuth = inject(Auth);  
  // Observable que emite el usuario autenticado
  user$ = user(this.firebaseAuth);
  // Signal para mantener el estado del usuario actual
  currentUserSig = signal<BookInterface | null | undefined>(undefined);

  // URL de la API de Firestore para el acceso directo a documentos
  private apiUrl = 'https://firestore.googleapis.com/v1/projects/proyectoppw/databases/(default)/documents/books';

  constructor(private http: HttpClient) {}

// Agrega un nuevo libro a la colección 'books' en Firestore
addBook(book: BookInterface): Observable<{ success: boolean, message: string }> {
  const db = getFirestore(); // Obtiene la instancia de Firestore
  const booksCollectionRef = collection(db, 'books'); // Referencia a la colección de libros
  return from(addDoc(booksCollectionRef, book)).pipe( // Promesa para agregar el libro
    switchMap((docRef) => {
      // Añadir el uid generado por Firestore al libro
      book.uid = docRef.id;
      const bookDocRef = doc(db, 'books', book.uid);
      return from(setDoc(bookDocRef, book)).pipe(
        switchMap(() => of({ success: true, message: 'El libro se ha agregado exitosamente.' })),
        catchError((error) => of({ success: false, message: 'Error al agregar el libro: ' + error.message }))
      );
    }),
    catchError((error) => of({ success: false, message: 'Error al agregar el libro: ' + error.message }))
  );
}

  // Recupera todos los libros de la colección 'books' en Firestore
  getBooks(): Observable<BookInterface[]> {
    const db = getFirestore(); // Obtiene la instancia de Firestore
    const booksCollectionRef = collection(db, 'books'); // Referencia a la colección de libros
    const getBooksPromise = getDocs(booksCollectionRef); // Promesa para obtener los documentos
    
    return from(getBooksPromise).pipe(
      switchMap(querySnapshot => {
        const books: BookInterface[] = []; // Array para almacenar los libros
        querySnapshot.forEach(doc => {
          const bookData = doc.data() as BookInterface;
          bookData.uid = doc.id; // Asigna el doc.id al campo uid
          books.push(bookData);
        });
        return of(books); // Emite el array de libros
      }),
      catchError((error: any) => {
        console.error('Error fetching books:', error); // Registra el error en consola
        return of([]); // Emite un array vacío en caso de error
      })
    );
  }

  // Actualiza un libro existente en la colección 'books' en Firestore
  updateBook(updatedBook: BookInterface): Observable<{ success: boolean, message: string }> {
    const db = getFirestore(); // Obtiene la instancia de Firestore
    const bookDocRef = doc(db, 'books', updatedBook.uid); // Referencia al documento del libro a actualizar
    const updateBookPromise = updateDoc(bookDocRef, {
      uid: updatedBook.uid,
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      publicationYear: updatedBook.publicationYear
    }); // Promesa para actualizar el documento
    return from(updateBookPromise).pipe(
      switchMap(() => of({ success: true, message: 'El libro se ha actualizado exitosamente.' })), // Respuesta exitosa
      catchError((error) => of({ success: false, message: 'Error al actualizar el libro: ' + error.message })) // Manejo de errores
    );
  }

  // Elimina un libro de la colección 'books' en Firestore
  deleteBook(author: string): Observable<{ success: boolean, message: string }> {
    const db = getFirestore(); // Obtiene la instancia de Firestore
    const bookDocRef = doc(db, 'books', author); // Referencia al documento del libro a eliminar
    const deleteBookPromise = deleteDoc(bookDocRef); // Promesa para eliminar el documento
    return from(deleteBookPromise).pipe(
      switchMap(() => of({ success: true, message: 'El libro se ha eliminado exitosamente.' })), // Respuesta exitosa
      catchError((error) => of({ success: false, message: 'Error al eliminar el libro: ' + error.message })) // Manejo de errores
    );
  }
}
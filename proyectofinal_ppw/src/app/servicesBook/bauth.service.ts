import { Injectable, inject, signal} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth'
import { getFirestore, doc, setDoc, getDoc, addDoc, Firestore } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of} from 'rxjs';
import { BookInterface } from '../../app/components/Books/book.interface';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BauthService {

  firebaseAuth = inject(Auth);  
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<BookInterface | null | undefined>(undefined)


  private apiUrl = 'https://firestore.googleapis.com/v1/projects/proyectoppw/databases/(default)/documents/books';

  constructor(private http: HttpClient) {}

  addBook(book: BookInterface): Observable<any> {
    return this.http.post(this.apiUrl, { fields: book });
  }
}

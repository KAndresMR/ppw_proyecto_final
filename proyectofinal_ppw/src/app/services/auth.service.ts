import { Injectable, inject, signal} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Observable, from, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserInterface } from '../components/Register/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  firebaseAuth = inject(Auth);  
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  constructor() {}

  register(email: string, username: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
      switchMap((userCredential) => {
        const userData: UserInterface = { // Utiliza la interfaz definida para los datos del usuario
          uid: userCredential.user.uid,
          username: username,
          email: email,
          isAdmin: false // Por defecto, el usuario no es administrador
          // Puedes agregar más campos según tus necesidades
        };
        const db = getFirestore();
        const userDocRef = doc(db, 'users', userData.uid); // Referencia al documento del usuario con su UID
        return from(setDoc(userDocRef, userData)); // Guardar los datos del usuario en Firestore
      })
    );
  }






/*(
    email: string, 
    username: string, 
    password:string
    
  ): Observable<void> {

    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password,
    ).then(response => updateProfile(response.user, { displayName: username }))
      return from(promise);
  }*/


  login(email: string, password: string): Observable<void> {
    

    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password,
    ).then(() => {});
    return from(promise);
  }


  getBooksData() {
    
  }




    

  getUserData(): Observable<UserInterface | null> {
    return this.user$.pipe(
      switchMap((userAuth) => {
        // Verificamos si hay un usuario autenticado
        if (userAuth) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', userAuth.uid); // Suponiendo que tienes una colección 'users' en Firestore
          return from(getDoc(userDocRef)).pipe(
            switchMap((docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data() as UserInterface;
                return of(userData);
              } else {
                return of(null); // El documento del usuario no existe
              }
            })
          );
        } else {
          return of(null); // No hay usuario autenticado
        }
      })
    );
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user, User } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { UserInterface } from '../components/Register/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inyección de dependencias para Firebase Authentication
  firebaseAuth = inject(Auth);  
  // Observable que emite el usuario autenticado
  user$ = user(this.firebaseAuth);
  // Signal para mantener el estado del usuario actual
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() {}

  // Registra un nuevo usuario en Firebase Authentication y almacena sus datos en Firestore
  register(email: string, username: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
      switchMap((userCredential) => {
        // Datos del usuario para almacenar en Firestore
        const userData: UserInterface = { 
          uid: userCredential.user.uid,
          username: username,
          email: email,
          password: password,
          isAdmin: true // Por defecto, el usuario no es administrador
        };
        const db = getFirestore(); // Obtiene la instancia de Firestore
        const userDocRef = doc(db, 'users', userData.uid); // Referencia al documento del usuario en Firestore
        return from(setDoc(userDocRef, userData)); // Guardar los datos del usuario en Firestore
      })
    );
  }

  getUsers(): Observable<UserInterface[]> {
    const db = getFirestore(); // Obtiene la instancia de Firestore
    const usersCollectionRef = collection(db, 'users'); // Referencia a la colección de usuarios
    const getUsersPromise = getDocs(usersCollectionRef); // Promesa para obtener los documentos
  
    return from(getUsersPromise).pipe(
      switchMap(querySnapshot => {
        const users: UserInterface[] = []; // Array para almacenar los usuarios
        querySnapshot.forEach(doc => {
          // Agrega cada usuario al array, asegurándose de no sobrescribir el campo 'username'
          const userData = doc.data() as UserInterface;
          userData.uid = doc.id; // Asigna el doc.id al campo uid
          users.push(userData);
        });
        return of(users); // Emite el array de usuarios
      }),
      catchError((error: any) => {
        console.error('Error fetching users:', error); // Registra el error en consola
        return of([]); // Emite un array vacío en caso de error
      })
    );
  }

  // Inicia sesión de un usuario con correo electrónico y contraseña
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(() => {}); // No realiza ninguna acción adicional tras iniciar sesión
    return from(promise);
  }

  // Obtiene los datos del usuario actualmente autenticado desde Firestore
  getUserData(): Observable<UserInterface | null> {
    return this.user$.pipe(
      switchMap((userAuth: User | null) => {
        // Verifica si hay un usuario autenticado
        if (userAuth) {
          const db = getFirestore(); // Obtiene la instancia de Firestore
          const userDocRef = doc(db, 'users', userAuth.uid); // Referencia al documento del usuario en Firestore
          return from(getDoc(userDocRef)).pipe(
            switchMap((docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data() as UserInterface; // Extrae los datos del usuario
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

// Actualiza un user existente en la colección 'users' en Firestore
updateUser(updatedUser: UserInterface): Observable<{ success: boolean, message: string }> {
  const db = getFirestore(); // Obtiene la instancia de Firestore
  const userDocRef = doc(db, 'users', updatedUser.uid); // Referencia al documento del libro a actualizar
  const updateUserPromise = updateDoc(userDocRef, {
    uid: updatedUser.uid,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin
  }); // Promesa para actualizar el documento
  return from(updateUserPromise).pipe(
    switchMap(() => of({ success: true, message: 'El usuario se ha actualizado exitosamente.' })), // Respuesta exitosa
    catchError((error) => of({ success: false, message: 'Error al actualizar el usuario: ' + error.message })) // Manejo de errores
  );
}


}
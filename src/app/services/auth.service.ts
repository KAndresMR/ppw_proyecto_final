import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth'
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { emit } from 'process';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../components/register/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  firebaseAuth = inject(Auth);  
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  register(
    email: string, 
    username: string, 
    password:string
    
  ): Observable<void> {
    console.log('Correo:',email,'Username',username,'Password:', password, );
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password,
    ).then(response => updateProfile(response.user, { displayName: username }))
      return from(promise);
  }


  login(email: string, password: string): Observable<void> {
    
    console.log('Correo:',email,'Password:', password, );

    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password,
    ).then(() => {});
    return from(promise);
  }

}

import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Router } from 'express';
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);


  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.uid);
  }

  



  constructor() { }
}

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA2Zvm6stX0pkAqhNwwZQ7V5AMxFzSBVMY",
  authDomain: "proyectoppw.firebaseapp.com",
  projectId: "proyectoppw",
  storageBucket: "proyectoppw.appspot.com",
  messagingSenderId: "143031959612",
  appId: "1:143031959612:web:4acbf06775874997d20339"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(()  => getAuth())
    


  ],
  

};

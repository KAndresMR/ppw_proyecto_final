import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyA2Zvm6stX0pkAqhNwwZQ7V5AMxFzSBVMY",
  authDomain: "proyectoppw.firebaseapp.com",
  projectId: "proyectoppw",
  storageBucket: "proyectoppw.appspot.com",
  messagingSenderId: "143031959612",
  appId: "1:143031959612:web:4acbf06775874997d20339"
};

initializeApp(firebaseConfig);


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),
  importProvidersFrom(
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  )]

};

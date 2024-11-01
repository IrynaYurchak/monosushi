import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"monosushi-10b64","appId":"1:136307858375:web:04b1404b6f6c74adb957e2","storageBucket":"monosushi-10b64.appspot.com","apiKey":"AIzaSyDLM5BoZjFBJ5Rn4Yz0j0VjZg6X9optFoY","authDomain":"monosushi-10b64.firebaseapp.com","messagingSenderId":"136307858375"})), provideStorage(() => getStorage())]
};

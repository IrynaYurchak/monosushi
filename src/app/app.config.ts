import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';


const firebaseMainConfig = {
  projectId: "monosushi-10b64",
  appId: "1:136307858375:web:04b1404b6f6c74adb957e2",
  storageBucket: "monosushi-10b64.appspot.com",
  apiKey: "AIzaSyDLM5BoZjFBJ5Rn4Yz0j0VjZg6X9optFoY",
  authDomain: "monosushi-10b64.firebaseapp.com",
  messagingSenderId: "136307858375",
};

const firebaseSecondaryConfig = {
  projectId: "monosushinew",
  appId: "1:564594953609:web:f610c850f2bbc59074e558",
  storageBucket: "monosushinew.appspot.com",
  apiKey: "AIzaSyC_f92NnsF1l_OemEPyP6A3DWAGNjegeWs",
  authDomain: "monosushinew.firebaseapp.com",
  messagingSenderId: "564594953609",
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({})
    ),
    SharedModule,

    // main-Firebase
    provideFirebaseApp(() => initializeApp(firebaseMainConfig)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    // firebaseSecondary
    provideFirebaseApp(() => initializeApp(firebaseSecondaryConfig, "secondary")),
    provideStorage(() => getStorage(initializeApp(firebaseSecondaryConfig, "secondary"))),
    provideFirestore(() => getFirestore(initializeApp(firebaseSecondaryConfig, "secondary"))),
    provideAuth(() => getAuth(initializeApp(firebaseSecondaryConfig, "secondary"))),

    provideAnimationsAsync(),
  ],
};

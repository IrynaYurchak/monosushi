
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../shared/services/account/account.service';
import { ROLE } from '../../shared/constant/role.constant';
import { Auth, signInWithEmailAndPassword, user, getAuth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { Firestore, doc, docData, getFirestore, setDoc } from '@angular/fire/firestore';
import { Subscription, first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SharedModule } from '../../shared/shared.module';


// Конфігурація другого Firebase-додатка
const secondaryFirebaseConfig = {
  projectId: 'monosushinew',
  appId: '1:564594953609:web:f610c850f2bbc59074e558',
  storageBucket: 'monosushinew.appspot.com',
  apiKey: 'AIzaSyC_f92NnsF1l_OemEPyP6A3DWAGNjegeWs',
  authDomain: 'monosushinew.firebaseapp.com',
  messagingSenderId: '564594953609',
};

@Component({
  selector: 'app-autorization',
  standalone: false,
  // imports: [CommonModule, RouterModule, HttpClientModule,  SharedModule, ReactiveFormsModule],
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss']
})
export class AutorizationComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup;
  public loginSubscriptoin!: Subscription;

  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary'); // Ініціалізація другого Firebase-додатка
  private secondaryAuth = getAuth(this.secondaryApp); // Auth другого Firebase
  private secondaryFirestore = getFirestore(this.secondaryApp); // Firestore другого Firebase


  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth, // Основний Auth
    private afs: Firestore,// Основний Firestore
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  ngOnDestroy(): void {
    this.loginSubscriptoin?.unsubscribe();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    // Використовуємо другий Firebase для логіну
    this.loginWithSecondaryFirebase(email, password)
      .then(() => {
        this.toastr.success('Ви успішно увійшли!', 'Успіх');
      })
      .catch((e) => {
        this.toastr.error('Помилка входу: ' + e.message, 'Помилка');
      });
  }

  async loginWithSecondaryFirebase(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.secondaryAuth, email, password);

    this.loginSubscriptoin = docData(doc(this.secondaryFirestore, 'users', credential.user.uid)).subscribe(
      (user) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        if (user && user['role'] === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        } else if (user && user['role'] === ROLE.ADMIN) {
          this.router.navigate(['/admin']);
        }
        this.accountService.isUserLogin$.next(true);
      },
      (e) => {
        console.log('error', e);
      }
    );
  }
  registerUser(): void {
    const { email, password } = this.authForm.value;
     this.emailSignUp(email, password)
    .then(() => {
     this.toastr.success('Ви успішно зареєструвалися!', 'Успіх');
     this.authForm.reset();
    })
  .catch((e) => {
     this.toastr.error('Помилка входу: ' + e.message, 'Помилка');
     });
  }
  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.secondaryAuth, email, password);
    const user={
      email:credential.user.email,
      firstName:'',
      lastName:'',
      phoneNamber:'',
      address:'',
      orders:[],
      role:'USER'
    }
    await setDoc(doc(this.secondaryFirestore, 'users', credential.user.uid), user);
  }


}

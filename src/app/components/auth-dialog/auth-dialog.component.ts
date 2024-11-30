import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { initializeApp, getApp  } from 'firebase/app';
import { Firestore, doc, docData, getFirestore, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account/account.service';
import { ROLE } from '../../shared/constant/role.constant';


const secondaryFirebaseConfig = {
  projectId: 'monosushinew',
  appId: '1:564594953609:web:f610c850f2bbc59074e558',
  storageBucket: 'monosushinew.appspot.com',
  apiKey: 'AIzaSyC_f92NnsF1l_OemEPyP6A3DWAGNjegeWs',
  authDomain: 'monosushinew.firebaseapp.com',
  messagingSenderId: '564594953609',
};

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  public authForm!: FormGroup;
  public newUser = true;

  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryAuth = getAuth(this.secondaryApp);
  private secondaryFirestore = getFirestore(this.secondaryApp);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
    
  }

  initAuthForm(): void {
    this.authForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        confirmPassword: [null], 
        name: [null], 
        lastName: [null],
        phone: [null], 
      },
    );
  }



  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.loginWithSecondaryFirebase(email, password)
      .then(() => this.toastr.success('Ви успішно увійшли!', 'Успіх'))
      .catch((e) => this.toastr.error('Помилка входу: ' + e.message, 'Помилка'));
      this.closeDialog()
  }

  async loginWithSecondaryFirebase(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.secondaryAuth, email, password);
    docData(doc(this.secondaryFirestore, 'users', credential.user.uid)).subscribe((user) => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) this.router.navigate(['/cabinet']);
      if (user && user['role'] === ROLE.ADMIN) this.router.navigate(['/admin']);
      this.accountService.isUserLogin$.next(true);
    });
  }

  registerUser(): void {
    const { email, password, name, lastName, phone } = this.authForm.value;
    this.emailSignUp(email, password, name, lastName, phone)
      .then(() => this.toastr.success('Ви успішно зареєструвалися!', 'Успіх'))
      .catch((e) => this.toastr.error('Помилка реєстрації: ' + e.message, 'Помилка'));
      this.closeDialog()
  }

  async emailSignUp(email: string, password: string, name: string, lastName: string, phone: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.secondaryAuth, email, password);
    const user = {
      email: credential.user.email,
      firstName: name,
      lastName: lastName,
      phoneNumber: phone,
      role: 'USER',
    };
    await setDoc(doc(this.secondaryFirestore, 'users', credential.user.uid), user);
  }

  register(): void {
    this.newUser = !this.newUser;
    this.initAuthForm(); 
   
  }
  closeDialog(): void {
    this.dialogRef.close(); 
  }
}

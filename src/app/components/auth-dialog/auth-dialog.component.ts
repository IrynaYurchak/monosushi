import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { initializeApp, getApp } from 'firebase/app';
import { Firestore, doc, docData, getFirestore, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account/account.service';
import { ROLE } from '../../shared/constant/role.constant';
import { IRegister } from '../../shared/interfaces/register/register';


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
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public newUser = true;
  public checkPassword = false;

  private registerData!: IRegister;
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
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmationPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],

    });
  }



  loginUser(): void {
    const { email, password } = this.loginForm.value;
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
    const { email, password } = this.registerForm.value;
    this.registerData = this.registerForm.value;
    this.emailSignUp(email, password)
      .then(() => {
        this.toastr.success('Ви успішно зареєструвалися!', 'Успіх');
        this.closeDialog();
      })
      .catch((e) => this.toastr.error('Помилка реєстрації: ' + e.message, 'Помилка'));

    console.log(this.registerForm.valid);
    console.log(this.registerForm.errors);
    console.log(this.registerForm.controls);
  }



  async emailSignUp(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.secondaryAuth, email, password);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: '',
      adress: '',
      orders: [],
      role: 'USER',
    };
    await setDoc(doc(this.secondaryFirestore, 'users', credential.user.uid), user);
  }


  register(): void {
    this.newUser = !this.newUser;
    this.initForms()

  }
  closeDialog(): void {
    this.dialogRef.close();

  }
  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.registerForm.controls['confirmationPassword'].setErrors({
        matchError: 'Паролі не співпадіють'
      })
    }
  }



  get password(): AbstractControl {
    return this.registerForm.controls['password']
  }
  get confirmed(): AbstractControl {
    return this.registerForm.controls['confirmationPassword']
  }
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name];
  }
}


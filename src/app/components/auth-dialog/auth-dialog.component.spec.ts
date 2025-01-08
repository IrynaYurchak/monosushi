import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { secondaryFirebaseConfig } from './auth-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AuthDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideFirebaseApp(() => initializeApp(secondaryFirebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ToastrService, useValue: { success: jasmine.createSpy(), error: jasmine.createSpy() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle newUser and call initForms', () => {
    spyOn(component, 'initForms');
    const initialNewUserState = component.newUser;

    component.register();

    expect(component.newUser).toBe(!initialNewUserState);
    expect(component.initForms).toHaveBeenCalled();
  });

  it('should close the dialog', () => {
    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should set error when passwords do not match', () => {
    component.registerForm = new FormBuilder().group({
      password: ['password123'],
      confirmationPassword: ['password321']
    });

    component.checkConfirmedPassword();

    const errors = component.registerForm.get('confirmationPassword')?.errors;
    expect(errors).toBeTruthy();
    expect(errors?.['matchError']).toBe('Паролі не співпадіють'); // Use correct syntax
    expect(component.checkPassword).toBeFalse();
  });

  it('should not set error when passwords match', () => {
    component.registerForm = new FormBuilder().group({
      password: ['password123'],
      confirmationPassword: ['password123']
    });

    component.checkConfirmedPassword();

    const errors = component.registerForm.get('confirmationPassword')?.errors;
    expect(errors).toBeNull();
    expect(component.checkPassword).toBeTrue();
  });

});

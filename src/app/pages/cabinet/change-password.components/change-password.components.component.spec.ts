import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponentsComponent } from './change-password.components.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangePasswordComponentsComponent', () => {
  let component: ChangePasswordComponentsComponent;
  let fixture: ComponentFixture<ChangePasswordComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the password form', () => {
    expect(component.passwordForm).toBeDefined();
    expect(component.passwordForm.controls['passwordOld']).toBeDefined();
    expect(component.passwordForm.controls['password']).toBeDefined();
    expect(component.passwordForm.controls['confirmationPassword']).toBeDefined();
  });

  it('should check password confirmation when passwords match', () => {
    component.passwordForm.controls['password'].setValue('123456');
    component.passwordForm.controls['confirmationPassword'].setValue('123456');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBeTrue();
    expect(component.passwordForm.controls['confirmationPassword'].errors).toBeNull();
  });

  it('should set error when passwords do not match', () => {
    component.passwordForm.controls['password'].setValue('123456');
    component.passwordForm.controls['confirmationPassword'].setValue('654321');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBeFalse();
    expect(component.passwordForm.controls['confirmationPassword'].errors).toEqual({
      matchError: 'Паролі не співпадіють',
    });
  });

  it('should reset the form on canceled', () => {
    component.passwordForm.controls['passwordOld'].setValue('123456');
    component.passwordForm.controls['password'].setValue('newpassword');
    component.passwordForm.controls['confirmationPassword'].setValue('newpassword');
    component.canceled();
    expect(component.passwordForm.value).toEqual({
      passwordOld: null,
      password: null,
      confirmationPassword: null,
    });
  });

  it('should reset the form on saveChange', () => {
    component.passwordForm.controls['passwordOld'].setValue('123456');
    component.passwordForm.controls['password'].setValue('newpassword');
    component.passwordForm.controls['confirmationPassword'].setValue('newpassword');
    component.saveChange();
    expect(component.passwordForm.value).toEqual({
      passwordOld: null,
      password: null,
      confirmationPassword: null,
    });
  });

  it('should check visibility error for required field', () => {
    component.passwordForm.controls['password'].setErrors({ required: true });
    expect(component.checkVisibilityError('password', 'required')).toBeTrue();

    component.passwordForm.controls['password'].setErrors(null);
    expect(component.checkVisibilityError('password', 'required')).toBeUndefined();
  });

  it('should handle invalid form submission gracefully', () => {
    component.passwordForm.controls['passwordOld'].setValue(null);
    component.passwordForm.controls['password'].setValue(null);
    component.passwordForm.controls['confirmationPassword'].setValue(null);
    expect(component.passwordForm.valid).toBeFalse();
  });

  it('should not set error if the password control does not exist', () => {
    const result = component.checkVisibilityError('nonexistentControl', 'required');
    expect(result).toBeNull();
  });
});


import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-change-password.components',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './change-password.components.component.html',
  styleUrl: './change-password.components.component.scss'
})
export class ChangePasswordComponentsComponent implements OnInit {
  public passwordForm!: FormGroup;
  public checkPassword = false;
  constructor(
    private fb: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.initPasswordForm();
  }
  initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      passwordOld: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmationPassword: [null, [Validators.required]],
    });

  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.passwordForm.controls['confirmationPassword'].setErrors({
        matchError: 'Паролі не співпадіють'
      })
    }
  }

  get password(): AbstractControl {
    return this.passwordForm.controls['password']
  }
  get confirmed(): AbstractControl {
    return this.passwordForm.controls['confirmationPassword']
  }
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.passwordForm.controls[control].errors?.[name];
  }

  canceled(): void { 
    this.passwordForm.reset()
  }
  saveChange(): void {
    this.passwordForm.reset()
   }

}
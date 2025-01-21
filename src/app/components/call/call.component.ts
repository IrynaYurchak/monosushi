import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent implements OnInit {
  public infoForm!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<CallComponent>,
  private router: Router,
  private toastr: ToastrService,
){}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.infoForm = this.fb.group({
      name: [null, [Validators.required,]],
      phone: [null, [Validators.required, Validators.pattern(/^\+380\d{9}$/)]]
    });
  }
  sent(): void {
   this. closeDialog()
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../shared/services/account/account.service';
import { ROLE } from '../../shared/constant/role.constant';
@Component({
  selector: 'app-autorization',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss']
})
export class AutorizationComponent implements OnInit {
  public authForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.initAuthForm();
  }
  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  login(): void {
    this.accountService.login(this.authForm.value).subscribe(
      data => {
        console.log(data);
        if (data && data.length > 0) {
          const user = data[0]
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.accountService.isUserLogin$.next(true)
          if (user && user.role === ROLE.USER) {
            this.router.navigate(['/cabinet']);
          } else if (user && user.role === ROLE.ADMIN) {
            this.router.navigate(['/admin']);
          }
        }
      },
      (e) => {
        console.log(e);
      }

    )
  };

}

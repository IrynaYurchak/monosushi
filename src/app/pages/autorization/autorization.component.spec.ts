import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutorizationComponent } from './autorization.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

describe('AutorizationComponent', () => {
  let component: AutorizationComponent;
  let fixture: ComponentFixture<AutorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error if the form is invalid', () => {
    component.authForm.setValue({ email: '', password: '' });
    component.loginUser();
    expect(component.authForm.valid).toBeFalse();
    expect(component['toastr'].error).toHaveBeenCalledWith('Помилка входу: Помилка валідації форми', 'Помилка');
  });

  it('should call loginWithSecondaryFirebase if the form is valid', async () => {
    spyOn(component, 'loginWithSecondaryFirebase').and.returnValue(Promise.resolve());
    component.authForm.setValue({ email: 'test@example.com', password: 'password123' });

    await component.loginUser();

    expect(component.loginWithSecondaryFirebase).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component['toastr'].success).toHaveBeenCalledWith('Ви успішно увійшли!', 'Успіх');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDiscountComponent } from './admin-discount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        CommonModule,
        AdminDiscountComponent
      ],
      providers: [
        { provide: AngularFireStorage, useValue: mockAngularFireStorage() },
        { provide: ToastrService, useValue: mockToastrService() },
        { provide: Storage, useValue: mockStorage() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
function mockAngularFireStorage() {
  return {
    upload: jasmine.createSpy('upload').and.returnValue(Promise.resolve({})),
    ref: jasmine.createSpy('ref').and.returnValue({
      getDownloadURL: jasmine.createSpy('getDownloadURL').and.returnValue(Promise.resolve('mockDownloadUrl')),
    }),
  };
}

// Мок для ToastrService
function mockToastrService() {
  return {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
    info: jasmine.createSpy('info'),
  };
}

// Мок для Storage
function mockStorage() {
  return {
    upload: jasmine.createSpy('upload'),
    ref: jasmine.createSpy('ref'),
  };
}


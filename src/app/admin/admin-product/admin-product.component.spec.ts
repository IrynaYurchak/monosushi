import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductComponent } from './admin-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Storage } from '@angular/fire/storage';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        CommonModule,
        AdminProductComponent
      ],

      providers: [
        { provide: AngularFireStorage, useValue: mockAngularFireStorage() },
        { provide: ToastrService, useValue: mockToastrService() },
        { provide: Storage, useValue: mockStorage() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Мок для AngularFireStorage
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

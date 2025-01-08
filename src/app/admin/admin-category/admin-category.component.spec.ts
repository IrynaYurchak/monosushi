import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoryComponent } from './admin-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage } from '@angular/fire/storage';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryComponent, ReactiveFormsModule],
      providers: [
        { provide: AngularFireStorage, useValue: mockAngularFireStorage() },
        { provide: ToastrService, useValue: mockToastrService() },
        { provide: Storage, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
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

function mockToastrService() {
  return {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
    info: jasmine.createSpy('info'),
  };


}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallComponent } from './call.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CallComponent', () => {
  let component: CallComponent;
  let fixture: ComponentFixture<CallComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CallComponent>>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [
        CallComponent,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in initForm method', () => {
    component.initForm();
    expect(component.infoForm).toBeDefined();
    expect(component.infoForm.controls['name']).toBeDefined();
    expect(component.infoForm.controls['phone']).toBeDefined();
    expect(component.infoForm.controls['phone'].validator).toBeTruthy();
  });

  it('should call closeDialog in sent method', () => {
    spyOn(component, 'closeDialog');
    component.sent();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should close the dialog in closeDialog method', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should validate phone number correctly', () => {
    component.initForm();
    const phoneControl = component.infoForm.controls['phone'];

    phoneControl.setValue('+380123456789');
    expect(phoneControl.valid).toBeTrue();

    phoneControl.setValue('12345');
    expect(phoneControl.valid).toBeFalse();
  });
});


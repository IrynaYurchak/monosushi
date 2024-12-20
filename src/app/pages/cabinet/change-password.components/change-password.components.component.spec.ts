import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponentsComponent } from './change-password.components.component';

describe('ChangePasswordComponentsComponent', () => {
  let component: ChangePasswordComponentsComponent;
  let fixture: ComponentFixture<ChangePasswordComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePasswordComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

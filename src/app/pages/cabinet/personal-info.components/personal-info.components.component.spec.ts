import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoComponentsComponent } from './personal-info.components.component';

describe('PersonalInfoComponentsComponent', () => {
  let component: PersonalInfoComponentsComponent;
  let fixture: ComponentFixture<PersonalInfoComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInfoComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalInfoComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

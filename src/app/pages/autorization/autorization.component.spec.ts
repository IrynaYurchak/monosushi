import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizationComponent } from './autorization.component';

describe('AutorizationComponent', () => {
  let component: AutorizationComponent;
  let fixture: ComponentFixture<AutorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

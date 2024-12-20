import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponentsComponent } from './orders.components.component';

describe('OrdersComponentsComponent', () => {
  let component: OrdersComponentsComponent;
  let fixture: ComponentFixture<OrdersComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

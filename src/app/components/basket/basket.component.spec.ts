import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total price of products in the basket', () => {
    component.productInBasket = [
      {
        id: '1',
        name: 'Product 1',
        price: 10,
        count: 2,
        category: { id: 1, name: 'Category 1', path: 'category-1', imgPath: 'cat1.jpg' },
        path: 'product-1',
        description: 'Description 1',
        weight: '1kg',
        imgPath: 'img1.jpg'
      },
      {
        id: '2',
        name: 'Product 2',
        price: 20,
        count: 2,
        category: { id: 2, name: 'Category 2', path: 'category-2', imgPath: 'cat2.jpg' },
        path: 'product-2',
        description: 'Description 2',
        weight: '2kg',
        imgPath: 'img2.jpg'
      },
      {
        id: '3',
        name: 'Product 3',
        price: 5,
        count: 4,
        category: { id: 3, name: 'Category 3', path: 'category-3', imgPath: 'cat3.jpg' },
        path: 'product-3',
        description: 'Description 3',
        weight: '0.5kg',
        imgPath: 'img3.jpg'
      }
    ];
    component.calculateTotal();

    const expectedTotal = (10 * 2) + (20 * 2) + (5 * 4);
    expect(component.total).toBe(expectedTotal);
  });
});

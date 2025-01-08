import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductInfoComponent } from './product-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IProductResponse } from '../../../shared/interfaces/product/product.interface';
import { OrderService } from '../../../shared/services/order/order.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    const mockProduct: IProductResponse = {
      id: '1',
      category: {
        id: 1,
        name: 'Mock Category',
        path: 'mock-category',
        imgPath: 'mock-category-img.jpg',
      },
      name: 'Mock Product',
      path: 'mock-product',
      description: 'This is a mock product description.',
      weight: '1kg',
      price: 100,
      imgPath: 'mock-product-img.jpg',
      count: 1,
    };

    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ product: mockProduct }), // Моковані дані від Resolver
          },
        },
        {
          provide: OrderService,
          useValue: {
            changeBasket: { next: jasmine.createSpy('next') },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentProduct correctly', () => {
    expect(component.currentProduct.name).toBe('Mock Product');
    expect(component.currentProduct.category.name).toBe('Mock Category');
    expect(component.currentProduct.category.path).toBe('mock-category');
  });

  it('should increment product count', () => {
    component.productCount(component.currentProduct, true);
    expect(component.currentProduct.count).toBe(2);
  });

  it('should decrement product count but not below 1', () => {
    component.productCount(component.currentProduct, false);
    expect(component.currentProduct.count).toBe(1);
  });

  it('should add product to basket', () => {
    spyOn(localStorage, 'setItem');
    component.addToBasket(component.currentProduct);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'basket',
      JSON.stringify([component.currentProduct])
    );
  });
});

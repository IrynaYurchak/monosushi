import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../../shared/services/product/product.service';
import { of } from 'rxjs';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts: IProductResponse[] = [
    {
      id: '1',
      name: 'Product 1',
      path: 'product-1',
      description: 'Test product',
      weight: '1kg',
      price: 100,
      imgPath: 'img1.jpg',
      count: 0,
      category: { id: 1, name: 'Category 1', path: 'category-1', imgPath: 'cat1.jpg' }
    },
    {
      id: '2',
      name: 'Product 2',
      path: 'product-2',
      description: 'Another product',
      weight: '2kg',
      price: 200,
      imgPath: 'img2.jpg',
      count: 2,
      category: { id: 2, name: 'Category 2', path: 'category-2', imgPath: 'cat2.jpg' }
    }
  ];

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['getAll']);
    productService.getAllFirebase.and.returnValue(of(mockProducts)); // Мок відповіді

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, ProductComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CommonModule
      ],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment product count', () => {
    const product = { ...mockProducts[0] };
    product.count = 1; // Стартове значення

    component.productCount(product, true);

    expect(product.count).toBe(2);
  });

  it('should decrement product count', () => {
    const product = { ...mockProducts[1] };
    product.count = 3; // Стартове значення

    component.productCount(product, false);

    expect(product.count).toBe(2);
  });

  it('should not decrement product count below 1', () => {
    const product = { ...mockProducts[0] };
    product.count = 1; // Мінімальне значення

    component.productCount(product, false);

    expect(product.count).toBe(1);
  });
});


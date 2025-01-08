import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environment/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@angular/fire/storage';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],


    providers: [{ provide: Storage, useValue: {} }]


    }).compileComponents();

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts: IProductResponse[] = [
      {
        id: '1',
        name: 'Test Product 1',
        price: 100,
        count: 10,
        category: { id: 1, name: 'Category 1', path: 'cat-1', imgPath: 'cat1.jpg' },
        path: 'test-product-1',
        description: 'Description 1',
        weight: '1kg',
        imgPath: 'img1.jpg',
      },
      {
        id: '2',
        name: 'Test Product 2',
        price: 200,
        count: 5,
        category: { id: 2, name: 'Category 2', path: 'cat-2', imgPath: 'cat2.jpg' },
        path: 'test-product-2',
        description: 'Description 2',
        weight: '2kg',
        imgPath: 'img2.jpg',
      },
    ];

    service.getAll().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a product', () => {
    const productRequest: IProductRequest = {
      category: { id: 1, name: 'Category 1', path: 'cat-1', imgPath: 'cat1.jpg' },
      name: 'New Product',
      path: 'new-product',
      description: 'New product description',
      weight: '500g',
      price: 50,
      imgPath: 'img.jpg',
      count: 5,
    };

    const mockResponse: IProductResponse = { ...productRequest, id: '3' };

    service.create(productRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});

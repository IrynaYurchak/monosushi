import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { environment } from '../../../environment/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductService', () => {
  let service: ProductService;
  let firestoreMock: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('Firestore', ['collection', 'doc', 'addDoc']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProductService,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a product in Firestore', (done) => {
    const productRequest: IProductRequest = {
      category: { id: 'cat1', name: 'Category 1', path: 'cat-1', imgPath: 'cat1.jpg' },
      name: 'New Product',
      path: 'new-product',
      description: 'New product description',
      weight: '500g',
      price: 50,
      imgPath: 'img.jpg',
      count: 5,
    };

    const mockResponse: IProductResponse = { ...productRequest, id: '3' };

    spyOn(service, 'createFirebase').and.returnValue(of(mockResponse));

    service.createFirebase(productRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('should retrieve all products from Firestore', (done) => {
    const mockProducts: IProductResponse[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        count: 10,
        category: { id: 'cat1', name: 'Category 1', path: 'cat-1', imgPath: 'cat1.jpg' },
        path: 'product-1',
        description: 'Description 1',
        weight: '1kg',
        imgPath: 'img1.jpg',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        count: 5,
        category: { id: 'cat2', name: 'Category 2', path: 'cat-2', imgPath: 'cat2.jpg' },
        path: 'product-2',
        description: 'Description 2',
        weight: '2kg',
        imgPath: 'img2.jpg',
      },
    ];

    spyOn(service, 'getAllFirebase').and.returnValue(of(mockProducts));

    service.getAllFirebase().subscribe((products) => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });

  it('should retrieve products by category from Firestore', (done) => {
    const categoryName = 'Category 1';
    const mockProducts: IProductResponse[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        count: 10,
        category: { id: 'cat1', name: 'Category 1', path: 'cat-1', imgPath: 'cat1.jpg' },
        path: 'product-1',
        description: 'Description 1',
        weight: '1kg',
        imgPath: 'img1.jpg',
      },
    ];

    spyOn(service, 'getAllByCategoryFirebase').and.returnValue(of(mockProducts));

    service.getAllByCategoryFirebase(categoryName).subscribe((products) => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });
});


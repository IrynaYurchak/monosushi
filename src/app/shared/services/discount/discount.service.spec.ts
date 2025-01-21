import { TestBed } from '@angular/core/testing';
import { DiscountService } from './discount.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IDiscountResponse, IDiscountRequest } from '../../interfaces/discount/discount.interface';
import { environment } from '../../../environment/environment';

describe('DiscountService', () => {
  let service: DiscountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DiscountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should fetch all discounts', () => {
  //   const mockDiscounts: IDiscountResponse[] = [
  //     {
  //       id: '1',
  //       data: '2025-01-01',
  //       name: 'Discount 1',
  //       title: 'Title 1',
  //       description: 'Description 1',
  //       imgPath: 'img1.jpg',
  //     },
  //     {
  //       id: '2',
  //       data: '2025-02-01',
  //       name: 'Discount 2',
  //       title: 'Title 2',
  //       description: 'Description 2',
  //       imgPath: 'img2.jpg',
  //     },
  //   ];
  //
  //   service.getAll().subscribe((discounts) => {
  //     expect(discounts).toEqual(mockDiscounts);
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discountes`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockDiscounts);
  // });
  //
  // it('should fetch a discount by ID', () => {
  //   const mockDiscount: IDiscountResponse = {
  //     id: '1',
  //     data: '2025-01-01',
  //     name: 'Discount 1',
  //     title: 'Title 1',
  //     description: 'Description 1',
  //     imgPath: 'img1.jpg',
  //   };
  //
  //   service.getOne('1').subscribe((discount) => {
  //     expect(discount).toEqual(mockDiscount);
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discountes/1`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockDiscount);
  // });
  //
  // it('should create a discount', () => {
  //   const mockRequest: IDiscountRequest = {
  //     data: '2025-03-01',
  //     name: 'New Discount',
  //     title: 'New Title',
  //     description: 'New Description',
  //     imgPath: 'new-img.jpg',
  //   };
  //   const mockResponse: IDiscountResponse = { id: '3', ...mockRequest };
  //
  //   service.create(mockRequest).subscribe((discount) => {
  //     expect(discount).toEqual(mockResponse);
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discountes`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual(mockRequest);
  //   req.flush(mockResponse);
  // });
  //
  // it('should update a discount', () => {
  //   const mockRequest: IDiscountRequest = {
  //     data: '2025-04-01',
  //     name: 'Updated Discount',
  //     title: 'Updated Title',
  //     description: 'Updated Description',
  //     imgPath: 'updated-img.jpg',
  //   };
  //   const mockResponse: IDiscountResponse = { id: '1', ...mockRequest };
  //
  //   service.update(mockRequest, '1').subscribe((discount) => {
  //     expect(discount).toEqual(mockResponse);
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discountes/1`);
  //   expect(req.request.method).toBe('PATCH');
  //   expect(req.request.body).toEqual(mockRequest);
  //   req.flush(mockResponse);
  // });
  //
  // it('should delete a discount', () => {
  //   service.delete('1').subscribe((response) => {
  //     expect(response).toBeNull();
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discountes/1`);
  //   expect(req.request.method).toBe('DELETE');
  //   req.flush(null); // Повертаємо null
  // });
});

import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ILogin } from '../../interfaces/account/account.interface';
import { environment } from '../../../environment/environment';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return user data', () => {
    const mockResponse = {
      id: 1,
      email: 'test@example.com',
      role: 'USER',
    };

    const credentials: ILogin = {
      email: 'test@example.com',
      password: 'password123',
    };

    service.login(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.BACKEND_URL}/auth?email=${credentials.email}&password=${credentials.password}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Відповідь на запит
  });
});

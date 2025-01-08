
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { ROLE } from '../../constant/role.constant';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;

  const executeGuard = (...guardParameters: [any, any]) =>
    TestBed.runInInjectionContext(() => authGuard(guardParameters[0], guardParameters[1]));

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access if currentUser is ADMIN', () => {
    const adminUser = { role: ROLE.ADMIN };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(adminUser));

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(true);
  });

  it('should allow access if currentUser is USER', () => {
    const user = { role: ROLE.USER };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(true);
  });

  it('should deny access if currentUser is not ADMIN or USER', () => {
    const otherUser = { role: 'GUEST' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(otherUser));
    mockRouter.parseUrl.and.returnValue({} as UrlTree);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(mockRouter.parseUrl('/'));
  });

  it('should deny access if currentUser is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    mockRouter.parseUrl.and.returnValue({} as UrlTree);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(mockRouter.parseUrl('/'));
  });
});


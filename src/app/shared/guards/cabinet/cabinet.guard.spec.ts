import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { cabinetGuard } from './cabinet.guard';

describe('cabinetGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  const executeGuard = (route: any, state: any) =>
    TestBed.runInInjectionContext(() => cabinetGuard(route, state));

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);
    mockRouter.parseUrl.and.returnValue('/' as any);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow access if currentUser is valid', () => {
    const validUser = JSON.stringify({ role: 'USER' });
    localStorage.setItem('currentUser', validUser);

    const result = executeGuard(null, { url: '/cabinet' });

    expect(result).toBeTrue();
  });

  it('should redirect if currentUser is invalid JSON', () => {
    localStorage.setItem('currentUser', 'invalidJson');

    const result = executeGuard(null, { url: '/cabinet' });

    expect(result).toBe(mockRouter.parseUrl('/'));
  });

  it('should redirect if currentUser is null', () => {
    const result = executeGuard(null, { url: '/cabinet' });

    expect(result).toBe(mockRouter.parseUrl('/'));
  });

  it('should redirect if currentUser role is not USER or ADMIN', () => {
    const invalidRoleUser = JSON.stringify({ role: 'GUEST' });
    localStorage.setItem('currentUser', invalidRoleUser);

    const result = executeGuard(null, { url: '/cabinet' });

    expect(result).toBe(mockRouter.parseUrl('/'));
  });
});

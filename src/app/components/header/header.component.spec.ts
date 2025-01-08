import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../shared/services/order/order.service';
import { AccountService } from '../../shared/services/account/account.service';
import { ROLE } from '../../shared/constant/role.constant';
import { Subject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockChangeBasket = new Subject<boolean>();

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['changeBasket']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockAccountService = jasmine.createSpyObj('AccountService', ['isUserLogin$'], {
      isUserLogin$: new Subject<boolean>(),
    });

    mockOrderService.changeBasket = mockChangeBasket;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, HeaderComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: AccountService, useValue: mockAccountService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogin and navigate based on user role', () => {
    const mockAdminUser = JSON.stringify({ role: ROLE.ADMIN });
    const mockUser = JSON.stringify({ role: ROLE.USER });
    const localStorageSpy = spyOn(localStorage, 'getItem');

    localStorageSpy.withArgs('currentUser').and.returnValue(mockAdminUser);
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.checkUserLogin();

    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toBe('admin');
    expect(component.loginPage).toBe('Admin');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin']);

    localStorageSpy.withArgs('currentUser').and.returnValue(mockUser);
    component.checkUserLogin();

    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toBe('cabinet');
    expect(component.loginPage).toBe('Cabinet');
    expect(component.isLoginUser).toBeTrue();
    expect(navigateSpy).toHaveBeenCalledWith(['/cabinet']);
  });
  it('should calculate total price correctly', () => {
    const mockBasket = [
      {
        id: '1',
        name: 'Product 1',
        price: 10,
        count: 2,
        category: { id: 1, name: 'Category 1', path: 'category-1', imgPath: 'cat1.jpg' },
        path: 'product-1',
        description: 'Description 1',
        weight: '1kg',
        imgPath: 'img1.jpg',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 20,
        count: 1,
        category: { id: 2, name: 'Category 2', path: 'category-2', imgPath: 'cat2.jpg' },
        path: 'product-2',
        description: 'Description 2',
        weight: '2kg',
        imgPath: 'img2.jpg',
      },
    ];
    component['basket'] = mockBasket;

    component.getTotalPrice();

    expect(component.total).toBe(40); // 10*2 + 20*1
  });
  it('should toggle menu state', () => {
    component.isMenuOpen = false;
    component.toggleMenu(new MouseEvent('click'));
    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu(new MouseEvent('click'));
    expect(component.isMenuOpen).toBeFalse();
  });
  it('should close menu', () => {
    component.isMenuOpen = true;
    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

});






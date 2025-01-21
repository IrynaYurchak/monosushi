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
    
    mockDialog.open.and.returnValue({
      afterClosed: () => new Subject(),
    } as any);

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

});






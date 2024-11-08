import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../shared/services/category/category.service';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { ROLE } from '../../shared/constant/role.constant';
import { AccountService } from '../../shared/services/account/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CategoryService]
})
export class HeaderComponent implements OnInit {
  categories: ICategoryResponse[] = [];
  private basket: Array<IProductResponse> = [];
  public productInBasket: Array<IProductResponse> = [];
  public total = 0;
  public basketContent = false;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  public isLoginUser=false

  constructor(
    private categoryService: CategoryService,
    private accountService: AccountService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdataUserLogin();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((categories: ICategoryResponse[]) => {
      this.categories = categories;
    });
  }

  isMenuOpen: boolean = false;

  toggleMenu(event: Event) {
    event.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.productInBasket = this.basket;
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) => total + prod.count * prod.price,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
      this.productInBasket = this.basket;
    });
  }

  showBasket(): void {
    this.basketContent = !this.basketContent;
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
  order(): void {
    this.basketContent = false;
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
      this.router.navigate(['/admin']);

    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
      this.router.navigate(['/cabinet']);
      this.isLoginUser=true

    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdataUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    });
  }
 
    logout(): void {
      this.router.navigate(['/']);
      localStorage.removeItem('currentUser');
      this.accountService.isUserLogin$.next(true);
      this.isLoginUser= false
    }
  
}


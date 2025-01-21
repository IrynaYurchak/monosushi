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
import {AuthDialogComponent, secondaryFirebaseConfig} from '../auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { BasketComponent } from '../basket/basket.component';
import { CallComponent } from '../call/call.component';
import { Firestore, doc, collection, onSnapshot } from '@angular/fire/firestore';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CategoryService],
})
export class HeaderComponent implements OnInit {
  categories: ICategoryResponse[] = [];
  public productInBasket: IProductResponse[] = [];
  public total = 0;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  public isLoginUser = false;
  private userId: string = '';
  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryFirestore: Firestore;
  constructor(
    private categoryService: CategoryService,
    private accountService: AccountService,
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog,
    private firestore: Firestore
  ) {
    this.secondaryFirestore = getFirestore(this.secondaryApp);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.checkUserLogin();
    this.checkUpdataUserLogin();
    this.subscribeToBasketUpdates();
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((categories: ICategoryResponse[]) => {
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

  // Підписка на зміни у кошику
  subscribeToBasketUpdates(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.uid) {
      this.userId = user.uid;
      const basketDoc = doc(this.secondaryFirestore, `order/${this.userId}`);
      onSnapshot(basketDoc, (snapshot) => {
        if (snapshot.exists()) {
          this.productInBasket = snapshot.data()['items'] || [];
          this.calculateTotal();
        } else {
          this.productInBasket = [];
          this.total = 0;

        }
      });
    }
  }


  // Розрахунок загальної суми
  calculateTotal(): void {
    this.total = this.productInBasket.reduce(
      (sum, prod) => sum + prod.count * prod.price,
      0
    );
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
      this.isLoginUser = true;
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
    this.isLoginUser = false;


  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
    });
  }

  openBasketDialog(): void {
    this.dialog.open(BasketComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'basketContent',
      autoFocus: false,
    });
  }

  openCallDialog(): void {
    this.dialog.open(CallComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'call-dialog',
    });
  }
}



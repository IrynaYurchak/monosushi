import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../shared/services/category/category.service';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';

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

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
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
  order():void{
    this.basketContent = false;
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../shared/services/order/order.service';
import { SharedModule } from '../../shared/shared.module';
import { Auth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  imports: [ReactiveFormsModule, SharedModule, CommonModule]
})
export class BasketComponent implements OnInit {
  public productInBasket: Array<IProductResponse> = [];
  private basket: Array<IProductResponse> = [];

  public total = 0;

  constructor(
    public dialogRef: MatDialogRef<BasketComponent>,
    private router: Router,
    private orderService: OrderService,

  ) { }

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    const basketData = localStorage.getItem('basket');
    if (basketData) {
      this.productInBasket = JSON.parse(basketData);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.productInBasket.reduce((sum, prod) => sum + prod.count * prod.price, 0);
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (product.count > 1) {
      --product.count;
    }

  this.calculateTotal();
  localStorage.setItem('basket', JSON.stringify(this.productInBasket));
  this.orderService.changeBasket.next(true);
  }

  order(): void {
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close(); // Закриття модалки
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
      this.productInBasket = this.basket;
    });
  }
  delete(product: IProductResponse): void {
    this.productInBasket = this.productInBasket.filter(
      (item) => item.id !== product.id
    );
    localStorage.setItem('basket', JSON.stringify(this.productInBasket));
    this.calculateTotal();
    this.orderService.changeBasket.next(true);
  }
}
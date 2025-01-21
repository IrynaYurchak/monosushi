import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../shared/services/order/order.service';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { doc, getDoc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from '@angular/fire/auth';
import { secondaryFirebaseConfig } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
})
export class BasketComponent implements OnInit {
  public productInBasket: Array<IProductResponse> = [];
  public total = 0;
  private userId = '';
  public loading = true;
  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryAuth = getAuth(this.secondaryApp);
  private secondaryFirestore = getFirestore(this.secondaryApp);

  constructor(
    public dialogRef: MatDialogRef<BasketComponent>,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  private async initializeUser(): Promise<void> {
    const user = this.secondaryAuth.currentUser;
    if (user) {
      this.userId = user.uid;
      await this.loadBasket();
    } else {
      this.productInBasket = [];
      this.total = 0;
      this.loading = false;
    }
  }


  async loadBasket(): Promise<void> {
    const orderDoc = doc(this.secondaryFirestore, `order/${this.userId}`);
    try {
      const orderSnapshot = await getDoc(orderDoc);
      if (orderSnapshot.exists()) {
        const orderData = orderSnapshot.data() as { items: IProductResponse[]; total: number };
        this.productInBasket = orderData.items || [];
        this.calculateTotal();
      } else {
        this.productInBasket = [];
      }
    } catch (error) {
      this.productInBasket = [];
    } finally {
      this.loading = false;
    }
  }

  calculateTotal(): void {
    this.total = this.productInBasket.reduce((sum, prod) => sum + (prod.count || 1) * prod.price, 0);
  }

  async productCount(product: IProductResponse, value: boolean): Promise<void> {
    if (!this.userId) {
      return;
    }

    if (value) {
      ++product.count;
    } else if (product.count > 1) {
      --product.count;
    }

    this.calculateTotal();
    await this.updateBasketInFirestore();
  }

  async updateBasketInFirestore(): Promise<void> {
    if (!this.userId) {
      return;
    }

    const orderDoc = doc(this.secondaryFirestore, `order/${this.userId}`);
    try {
      await updateDoc(orderDoc, { items: this.productInBasket, total: this.total });
    } catch (error) {

    }
  }

  async deleteProduct(product: IProductResponse): Promise<void> {
    this.productInBasket = this.productInBasket.filter((item) => item.id !== product.id);
    this.calculateTotal();
    await this.updateBasketInFirestore();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  order(): void {
    this.closeDialog();
  }

  isUserLoggedIn(): boolean {
    return !!this.secondaryAuth.currentUser;
  }
}

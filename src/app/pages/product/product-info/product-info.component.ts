import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from '../../../shared/interfaces/product/product.interface';
import { Firestore, doc, getDoc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { secondaryFirebaseConfig } from '../../../components/auth-dialog/auth-dialog.component';
import { getFirestore } from 'firebase/firestore';
import { OrderService } from '../../../shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-info',
  standalone: false,
   templateUrl: './product-info.component.html',
   styleUrls: ['./product-info.component.scss'],
})

export class ProductInfoComponent implements OnInit {
  public currentProduct: IProductResponse = {} as IProductResponse;
  public order: { items: IProductResponse[]; total: number; orderDate: string } = {
    items: [],
    total: 0,
    orderDate: '',
  };

  private userId = '';
  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryFirestore: Firestore;

  constructor(
    private activateRouter: ActivatedRoute,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.secondaryFirestore = getFirestore(this.secondaryApp);
  }

  ngOnInit(): void {
    this.initializeUser();
    if (this.userId) {
      this.loadOrderFromFirestore();
    }

    this.activateRouter.data.subscribe((data) => {
      this.currentProduct = data['product'];
      if (!this.currentProduct.count) {
        this.currentProduct.count = 1;
      }
    });
  }
  private initializeUser(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.uid) {
      this.userId = user.uid;
    } else {
    }
  }

  private loadOrderFromFirestore(): void {
    const orderDoc = doc(this.secondaryFirestore, `order/${this.userId}`);
    onSnapshot(orderDoc, (snapshot) => {
      this.cdr.detectChanges();
      if (snapshot.exists()) {
        const orderData = snapshot.data() as { items: IProductResponse[]; total: number; orderDate: string };
        this.order = orderData;
      } else {
        this.toastr.error('Помилка входу: Помилка валідації форми', 'Помилка');
        this.order = {items: [], total: 0, orderDate: ''};
      }
    });
  }

  async addToBasket(product: IProductResponse): Promise<void> {
    if (!this.userId) {
      this.toastr.error('Користувач не авторизований', 'Помилка');
      return;
    }

    const orderDoc = doc(this.secondaryFirestore, `order/${this.userId}`);
    let orderSnapshot;

    try {
      orderSnapshot = await getDoc(orderDoc);
    } catch (error) {
      return;
    }

    if (orderSnapshot.exists()) {
      const existingOrder = orderSnapshot.data() as { items: IProductResponse[]; total: number; orderDate: string };
      const existingProductIndex = existingOrder.items.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        existingOrder.items[existingProductIndex].count += product.count;
      } else {
        existingOrder.items.push(product);
      }

      existingOrder.total = existingOrder.items.reduce((sum, p) => sum + (p.count || 1) * p.price, 0);

      await setDoc(orderDoc, existingOrder, {merge: true});
    } else {
      const newOrder = {
        items: [product],
        total: product.count * product.price,
        orderDate: new Date().toISOString(),
      };
      await setDoc(orderDoc, newOrder);
    }

    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  productCount(product: IProductResponse, increment: boolean): void {
    if (increment) {
      product.count++;
    } else if (product.count > 1) {
      product.count--;
    }
  }
}


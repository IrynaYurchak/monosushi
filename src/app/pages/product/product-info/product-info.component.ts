import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from '../../../shared/interfaces/product/product.interface';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-product-info',
  standalone: false,
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public currentProduct: IProductResponse = {} as IProductResponse;

  constructor(
    private activateRouter: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.activateRouter.data.subscribe(data => {
      this.currentProduct = data['product'];
      console.log(this.currentProduct)
      if (!this.currentProduct.count) {
        this.currentProduct.count = 1;
      }
    });
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
}

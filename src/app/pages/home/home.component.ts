import { Component, OnInit } from '@angular/core';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductService],
})
export class HomeComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllFirebase().subscribe((products) => {
      this.userProducts = products.map((product) => ({
        ...product,
        count: product.count || 1,
      }));
    });
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (!product.count) {
      product.count = 1;
    }

    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
}

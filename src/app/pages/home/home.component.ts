import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from '../product/product.component'; // Імпорт компоненти Product
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ProductComponent], 
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
    this.productService.getAll().subscribe((userProducts: IProductResponse[]) => {
      this.userProducts = userProducts.map(product => {
        if (!product.count) {
          product.count = 1;
        }
        return product;
      });
    });
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: false,
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  public userProducts: Array<IProductResponse> = [];
  public currentProduct!: IProductResponse;
  private eventSubscription!: Subscription;

  constructor(
    private productServices: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProduct();
      }
    })
  }
  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productServices.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data.map(product => {
        if (!product.count) {
          product.count = 1;
        }
        return product;
      });
    });
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
}


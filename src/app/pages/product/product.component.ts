import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers:[ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  implements OnInit {
 public userProducts: Array<IProductResponse> =[];
 constructor(private productServices: ProductService) {}
 ngOnInit(): void {
  this.loadProduct();
}

loadProduct(): void {
  this.productServices.getAll().subscribe((userProducts: IProductResponse[]) => {
    this.userProducts = userProducts;
  });
}
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductRoutingModule } from './product-routing.module';




@NgModule({
  declarations: [ProductComponent, ProductInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }




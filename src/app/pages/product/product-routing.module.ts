import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductResolver } from '../../shared/services/product/product.resolver';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductComponent } from './product.component';



const routes: Routes =  [
  { path: ':category', component: ProductComponent },
  {
    path: ':category/:id',
    component: ProductInfoComponent,
    resolve: { product: ProductResolver }
  }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class  ProductRoutingModule {
}

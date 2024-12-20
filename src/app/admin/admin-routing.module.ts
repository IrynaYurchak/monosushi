import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { authGuard } from '../shared/guards/auth/auth.guard';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';


const routes:Routes=[
  {
    path: '', component: AdminComponent, canActivate: [authGuard], children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' }

    ]
  }
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class  AdminRoutingModule {
}

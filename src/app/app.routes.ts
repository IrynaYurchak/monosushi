import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AutorizationComponent } from './pages/autorization/autorization.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { DiscountInfoComponent } from './pages/discount/discount-info/discount-info.component';
import { ProductResolver } from './shared/services/product/product.resolver';
import { DiscountResolver } from './shared/services/discount/discount.resolver';
import { authGuard } from './shared/guards/auth/auth.guard';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { cabinetGuard } from './shared/guards/cabinet/cabinet.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  {
    path: 'discount/:id', component: DiscountInfoComponent,
    resolve: { discount: DiscountResolver }
  },
  { path: 'product/:category', component: ProductComponent },
  {
    path: 'product/:category/:id', component: ProductInfoComponent,
    resolve: { product: ProductResolver }
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'auth', component: AutorizationComponent },
  { path: 'cabinet', component: CabinetComponent, canActivate:[cabinetGuard] },
  {
    path: 'admin', component: AdminComponent, canActivate:[authGuard], children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' }

    ]
  }
]

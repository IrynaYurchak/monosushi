import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth/auth.guard';
import { cabinetGuard } from './shared/guards/cabinet/cabinet.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Lazy-loaded модулі
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'discount', loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule) },
  { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'delivery', loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'auth', loadChildren: () => import('./pages/autorization/autorization.module').then(m => m.AutorizationModule) },
  { path: 'admin', canActivate: [authGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'cabinet', canActivate: [cabinetGuard], loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule) },


  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

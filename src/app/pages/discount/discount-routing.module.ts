import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DiscountComponent } from './discount.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';
import { DiscountResolver } from '../../shared/services/discount/discount.resolver';



const routes: Routes = [
  {
    path: '',
    component: DiscountComponent
  },
  {
    path: ':id',
    component: DiscountInfoComponent,
    resolve: { discount: DiscountResolver }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class  DiscountRoutingModule {
}

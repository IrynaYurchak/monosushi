import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DeliveryComponent} from './delivery.component';

const routes:Routes=[
  {
    path: '', component: DeliveryComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class  DeliveryRoutingModule {}

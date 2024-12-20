import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { SharedModule } from '../../shared/shared.module';
import { DeliveryRoutingModule } from './delivery-routing.module';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule
  ]
})
export class DeliveryModule { }

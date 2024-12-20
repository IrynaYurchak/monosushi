import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AutorizationRoutingModule} from './autorization-routing.module';
import {AutorizationComponent} from './autorization.component';


@NgModule({
  declarations: [AutorizationComponent],
  imports: [
    CommonModule,
    SharedModule,
    AutorizationRoutingModule,
  ]
})
export class AutorizationModule { }


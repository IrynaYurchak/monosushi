import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AutorizationComponent} from './autorization.component';

const routes:Routes=[
  {
    path: '', component: AutorizationComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class  AutorizationRoutingModule {}

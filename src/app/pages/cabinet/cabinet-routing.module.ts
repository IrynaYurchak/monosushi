import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CabinetComponent } from './cabinet.component';
import { cabinetGuard } from '../../shared/guards/cabinet/cabinet.guard';
import { PersonalInfoComponentsComponent } from './personal-info.components/personal-info.components.component';
import { OrdersComponentsComponent } from './orders.components/orders.components.component';
import { ChangePasswordComponentsComponent } from './change-password.components/change-password.components.component';



const routes:Routes=[
  {
    path: '', component: CabinetComponent, canActivate: [cabinetGuard], children: [
      { path: 'personal', component: PersonalInfoComponentsComponent },
      { path: 'orders', component: OrdersComponentsComponent },
      { path: 'change', component: ChangePasswordComponentsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal' }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class  CabinetRoutingModule {
}

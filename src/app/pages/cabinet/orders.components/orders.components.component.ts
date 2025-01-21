import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-orders.components',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './orders.components.component.html',
  styleUrl: './orders.components.component.scss'
})
export class OrdersComponentsComponent {
  orders = [
    {
      date: '02.12.24',
      address: 'м. Львів,Бандери, 1',
      total: 550,
      items: [
        { name: 'Філадельфія в кунжуті',  quantity: 1 },
        { name: 'Унагі соус',quantity: 1 },
      ]
    },
    {
      date: '05.12.24',
      address: 'Самовивіз',
      total: 1375,
      items: [
        { name: 'Моно сет',  quantity: 1 },
        { name: 'Філадельфія з лососем', quantity: 2 }
      ]
    }
  ];

}

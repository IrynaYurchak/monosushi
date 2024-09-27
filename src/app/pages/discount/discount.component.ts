import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IDiscountResponse } from '../../shared/interfaces/discount/discount.interface';
import { DiscountService } from '../../shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
  providers: [DiscountService]
})
export class DiscountComponent implements OnInit {

  public userDiscountes: Array<IDiscountResponse> = [];

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.loadDiscount();
  }

  loadDiscount(): void {
    this.discountService.getAll().subscribe((userDiscountes: IDiscountResponse[]) => {
      this.userDiscountes = userDiscountes;
    });
  }
}




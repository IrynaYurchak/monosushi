import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from '../../../shared/interfaces/discount/discount.interface';
import { ActivatedRoute } from '@angular/router';
import { DiscountService } from '../../../shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  standalone: false,
  providers:[DiscountService],
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {
  public userDiscount!: IDiscountResponse;

  constructor(private activateRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRouter.data.subscribe((data) => {
      this.userDiscount = data['discount'];
    });
  }

  splitDescription(description: string): string[] {
    return description.split('\n');
  }
}

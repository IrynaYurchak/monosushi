import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IDiscountResponse } from '../../../shared/interfaces/discount/discount.interface';
import { DiscountService } from '../../../shared/services/discount/discount.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountResolver implements Resolve<IDiscountResponse> {
  constructor(private discountService: DiscountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
    const id = route.paramMap.get('id') as string;
    return this.discountService.getOneFirebase(id);
  }
}

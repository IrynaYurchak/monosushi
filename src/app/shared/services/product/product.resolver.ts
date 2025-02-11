import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {catchError, EMPTY, map, Observable} from 'rxjs';
import { ProductService } from './product.service';
import { IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProductResponse> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductResponse> {
    const id = route.paramMap.get('id') as string;
    return this.productService.getOneFirebase(id).pipe(
      map(data => {
        if (!data) {
          throw new Error('Продукт не знайдено'); // Кидає помилку, якщо дані відсутні
        }
        return data as IProductResponse;
      })
    );
  }

}

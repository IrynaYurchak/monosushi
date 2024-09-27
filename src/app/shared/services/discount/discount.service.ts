import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiscountResponse, IDiscountRequest } from '../../interfaces/discount/discount.interface';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url = environment.BACKEND_URL;
  private api = { discountes: `${this.url}/discountes` }
  constructor(private http: HttpClient) { }

  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discountes);
  }
  create(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.discountes, discount)
  }
  update(discount:  IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.discountes}/${id}`, discount);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discountes}/${id}`);
  }
}
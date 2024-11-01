import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` }
  constructor(private http: HttpClient) { }
  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }
  getAllByCategory(name: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category=${name}`);
  }
  getOne(id: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
  }
  create(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product)
  }
  update(product: IProductRequest, id: string): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }
  
}

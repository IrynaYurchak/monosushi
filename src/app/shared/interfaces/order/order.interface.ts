import {IProductRequest, IProductResponse} from "../product/product.interface";

export interface IOrderRequest {
  userId: string;
  items: IProductResponse[];
  total: number;
  orderDate: string;
}

export interface IOrderResponse extends IOrderRequest {
  id: string;
}

import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name:string;
    path:string;
    description:string;
    weight:string;
    price: number;
    imgPath:string;
  count: number;
}
export interface IProductResponse extends IProductRequest {
    id: string;
}

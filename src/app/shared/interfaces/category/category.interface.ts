export interface ICategoryRequest{
    name:string;
    path:string;
    imgPath:string;
}
export interface ICategoryResponse extends ICategoryRequest{
    id:number | string;
}

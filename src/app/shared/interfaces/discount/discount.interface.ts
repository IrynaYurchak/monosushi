
export interface IDiscountRequest{
    data:string;
    name:string;
    title:string;
    description:string;
    imgPath:string;
}
export interface IDiscountResponse extends IDiscountRequest{
    id:number;
}


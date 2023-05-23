export interface Product {
    qty:number;
    num:number;
    id?:string;
    iid:number;
    code?:string;
    iname?:string;
    description?:string;
    price:number;
    quantity?:number;
    inventoryStatus?:string;
    cname?:string;
    image?:string;
    rating?:number;
    cartTotal:number; 
    favouriteTotal:number; 
    discount?:number; 
}

export interface submitReq{
    name:string,
    mobile:number,
    email:string
}
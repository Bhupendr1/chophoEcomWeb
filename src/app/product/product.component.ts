import { Component, EventEmitter,Input,Output} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Product } from 'src/app/product';
import { PrimeNGConfig } from 'primeng/api';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { outputAst } from '@angular/compiler';
import { FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ProductComponent {
  sortKey:any;
  sortKeyCat:any;
  sortKeystock:any;
  sortOptions:SelectItem[]=[];
  sortCategory:SelectItem[]=[];
  sortStock:SelectItem[]=[];
  sortOrder!: number;
  sortField!: string;
  products!:Product[];
  responsiveOptions:any;
  discount:number=15;
  discountprice:any[]=[];
  constructor(
    private productService: ProductserviceService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private _Api:ProductserviceService
     ) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
     }
  getEventValue($event:any){
   return $event.target.value
  } 
  onSortChange(event:any) {
 
    let value = event.value;
    if (value.indexOf('!') === 0) {
      
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

ngOnInit():void {
  this.getCartList();
  this.GetProduct()
  // this.getCartItemCount();
  this.sortOptions = 
  [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];
  this.sortCategory = 
  [
    {label: 'Vegetables', value: '!cname'},
    {label: 'Fruits', value: 'cname'}
];
  this.sortStock = 
  [
    {label: 'In-Stock', value: 'inventoryStatus'},
    {label: 'less or Out of Stock', value: '!inventoryStatus'}
];
  this.primengConfig.ripple = true;
}

status:any=[]
  addToCart(product:any) { 
  
    let data={
         "userID" : 1,
         "qunatity": 1,
         "itemID" : product.iid,
         "inStock" : 1
       }
    this.productService.postRequestUrl01(data,"EcartCustomerCart/AddToCart")
    .subscribe(
    {
      next: (res) => {
        console.log(res)
            if (res) {
          this._Api.getCountCart();
          this.getCartList();
          this.messageService.add({key:'s',severity:'success', summary: 'Success', detail: res.data.Message});

        }
      },
      error: (err)=> {
       this.messageService.add({key:'e',severity:'error', summary: 'Error', detail: err.error.Message});
      },

    })
}
TotalPrice(Price:any,discount:any){
  let totalPrice=(Price-(Price*discount/100)).toFixed(2);
  return totalPrice
}
GetProduct(){
  this._Api.postRequestUrl01("",'EcartAddProduct/GetProduct').subscribe(res=>{
    this.products=res.data;
  })
}
getCartList(){
  let rdata = {"userId": 1}
    this._Api.postRequestUrl01(rdata, 'EcartCustomerCart/GetCartId').subscribe(res => {
      this.itemId=res.data;
    })
   
}
itemId: any[]=[];
testfun(data:number){
  return this.itemId.find(element => element == data);
}
}




import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { Product } from '../product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent {
  checkoutform !: FormGroup;
  allProduct: number = 0;
  productvalue: number = 0;
  quantitydata: any;
  quantitysingle: any = [];
  constructor(private _Api: ProductserviceService, private formBuilder: FormBuilder, private route: Router, private messageService: MessageService) { }
  cart: any = []
  checkoutForm = this.formBuilder.group({
    Price: ['', Validators.required],
  });
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {let rdata = {"userId": 1}
    this._Api.postRequestUrl01(rdata, 'EcartCustomerCart/GetCartValue').subscribe(res => {
      this.cart = res.data;
    })
  }
    //prduct Total funcation
  getTotal() {
    return this.cart.reduce((i: number, j: { price: number; qunatity: number; }) => i + j.price * j.qunatity, 0);
  }
  //prduct decuted funcation
  decreaseCartItem(data:any){
   console.log(data)
    let rdata={
      "iid":data.iid,
      "qunatity": data.qunatity-1,
      "cartId": data.cartID
      }
  this._Api.postRequestUrl01(rdata,'EcartCustomerCart/IncrementAndDecrementItem').subscribe(res=>{
    this.loadCart()
  })
  }
  //prduct add funcation
  increaseCartItem(data:any){
    console.log(data)
    let rdata={
      "iid":data.iid,
      "qunatity": data.qunatity+1,
      "cartId": data.cartID
      }
  this._Api.postRequestUrl01(rdata,'EcartCustomerCart/IncrementAndDecrementItem').subscribe(res=>{
    this.loadCart()
  })
  }
   //prduct remove funcation
  removeCartItem(data:any){
    //console.log(data)
    let rdata={
      "cartID": data.cartID,
      "userID":1,
      }
      //console.log(rdata)
  this._Api.postRequestUrl01(rdata,'EcartCustomerCart/DeleteCart').subscribe(res=>{
    this.loadCart()
    this._Api.getCountCart();
    this.messageService.add({key:'s',severity:'success', summary: 'Success', detail: res.data.Message});
  })
  }
   //prduct Checkout funcation
  checkOut() {
    debugger
    console.log(this.getTotal());
    sessionStorage.setItem('totalPrice', this.getTotal());
    sessionStorage.setItem('itemsPerPage', JSON.stringify(this.cart));
    this.route.navigateByUrl('/Checkout')
  }

}
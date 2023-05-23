import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/service/productservice.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  rndInt = "OrderId"+Math.floor(Math.random() * 11088888);
  orderHistory:any=[];
  products:any=[];
  price:any
  discount:any=12;
  totalprice:any;
  sOrderId:any;
  constructor(private Productservice: ProductserviceService,private route:Router) { }
  ngOnInit():void{
    this.totalprice=(this.price-(this.price*this.discount)/100).toFixed(2);
    this.sOrderId =  sessionStorage.getItem('orderId');
    this.orderDetailsList()
  }
  orderDetailsList(){
    console.log(this.sOrderId)
    let orderId1={
      "orderId":this.sOrderId,
      "userId":1
    }
    this.Productservice.postRequestUrl01(orderId1,'EcartOrder/GetPlaceOrder').subscribe(result=>{
      this.orderHistory=result.data
    })
  } 
}

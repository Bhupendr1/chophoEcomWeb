import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductserviceService } from '../service/productservice.service';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig
} from "primeng/api";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MessageService]
})
export class CheckoutComponent {
  sessionVal:any[]=[];
  price:any=0;
  discount:any=12;
  sitemid:string='';
  squnty:string='';
  totalprice:any=0;
  empselfData: any = [];
  typeExpress: string[] = ['Component 1', 'Component 2', 'Component 3'];
  checkoutform!: FormGroup;
  submitted = false;
  constructor(
        private fb:FormBuilder,
        private router:Router,
        private Productservice:ProductserviceService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig,

      ) {
  
      }
  numberonly=/^[0-9]*$/;
  ngOnInit(): void {
    this.checkoutform = this.fb.group(
      {
        email: ['', [Validators.required,Validators.email]],
        FirstName: ['',[Validators.required,Validators.maxLength(25)]],
        lastName: ['', [Validators.required,Validators.maxLength(25)]],
        Apartment: ['',[Validators.required,Validators.maxLength(60)]],
        District: ['', Validators.required],
        City: ['', Validators.required],
        pinCode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
        Phone: ['', [Validators.required,Validators.pattern(this.numberonly),Validators.maxLength(10),Validators.minLength(10)]],
        paymentOption:['', Validators.required],
        Promocode:[''],
        CardholderName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(35)]],
        CVC: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
        Expiry: ['', [Validators.required,Validators.maxLength(4),Validators.minLength(4)]],
        CardNumber: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
        
      }
    );
    this.price =sessionStorage.getItem('totalPrice');
    this.sessionVal =  JSON.parse(sessionStorage.getItem('itemsPerPage')!);
    this.totalprice=(this.price-(this.price*this.discount)/100).toFixed(2);

    this.sessionVal.forEach(data => {
      if(this.sitemid=='' || this.squnty == ''){
        this.sitemid=data.iid;
        this.squnty=data.qunatity;
      }else{
        this.sitemid=this.sitemid + ',' + data.iid
        this.squnty=this.squnty + ',' + data.qunatity
      }
    });
   
  }

  cart:any=[]
  cartlist(){
    this.Productservice.getCartList().subscribe( res =>{
      this.cart=res;
      console.log(res)
    })
  }


  selectedItem :any = [];
  setItem(item:any){
    this.selectedItem = item
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'info', summary:'Are you sure?', detail:'Confirm to proceed'});
}

onReject() {
  this.messageService.clear('c');
}

clear() {
  this.messageService.clear();
}

getCartItemCount(){
  this.Productservice.getCartList().subscribe(d=>{
  this.Productservice.ProductCount.next(d.length)
  console.log()
})    
}
  get f(): { [key: string]: AbstractControl } {
    return this.checkoutform.controls;
  }
  
  deleteitem(id:any){
    this.Productservice.deleteCart(id).subscribe(res=>{
    })
}
confirm(event:Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
     debugger
     this.submitted = true;
     if (this.checkoutform.invalid) {
       return;
     } else{
            let rdata={
              "orderSummary": {
                "price": this.price,
                "deliveryCharge":0,
                "discount": this.discount,
                "promoCode": this.checkoutform.controls["Promocode"].value,
                "totalPrice": this.totalprice
            },
                "paymentMode":this.checkoutform.controls["paymentOption"].value,
                "itemId":this.sitemid,
                "itemQnt":this.squnty,
              "shippingAddress": {
                "email": this.checkoutform.value.email,
                "firstName": this.checkoutform.controls["FirstName"].value,
                "lastName": this.checkoutform.controls["lastName"].value,
                "address": this.checkoutform.controls["Apartment"].value,
                "district": this.checkoutform.controls["District"].value,
                "city": this.checkoutform.controls["City"].value,
                "pinCode": this.checkoutform.controls["pinCode"].value,
                "phone": this.checkoutform.controls["Phone"].value,
                "userId": 1
            }
            }
            debugger
          this.Productservice.postRequestUrl01(rdata,'EcartOrder/PlaceOrder').subscribe({
          next: (res) => {        
              if (res.status = 200) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "You have accepted"
                });
                sessionStorage.setItem('orderId',res.data.OrderId);
                this.Productservice.setcountCartval(0)
                this.router.navigateByUrl('/order');
              }
            },
          error: (err) => {
              let errorObj = {
                message: err.message,
                err: err,
                response: err
              }
            }
            })
          }
        },
        reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"



        });
      }
    });
  }

  ClearValidationInputData(){
    debugger
    this.checkoutform = this.fb.group(
      {
        CardholderName: [''],
        CVC: [''],
        Expiry: [''],
        CardNumber: [''],
        email: [this.checkoutform.value.email],
        paymentOption: [this.checkoutform.value.paymentOption],
        FirstName: [this.checkoutform.value.FirstName],
        lastName: [this.checkoutform.value.lastName],
        Apartment: [this.checkoutform.value.Apartment],
        District: [this.checkoutform.value.District],
        City: [this.checkoutform.value.City],
        pinCode: [this.checkoutform.value.pinCode],
        Phone: [this.checkoutform.value.Phone],
        Promocode:[this.checkoutform.value.Promocode],
      }
    );
  }
}


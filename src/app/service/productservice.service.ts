
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { map,BehaviorSubject, Observable,} from 'rxjs';
import { Product } from '../product';
import { Router } from "@angular/router";
import { login } from "../login";
import { SignUp } from "../signup";
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  //cart item count start
  ProductCount = new BehaviorSubject(0)
  //cart item count end
  productList = new BehaviorSubject<any>([]);
  cartDataList: Product[] = [];
  cart: Product[] = [];
  countdata!:number;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  private countCartval = new BehaviorSubject<number>(0);

  public getcountCartval(): Observable<number> {
   return this.countCartval.asObservable();
 }

   setcountCartval(Num: number): void {
    this.countCartval.next(Num);
 }

  constructor(private http: HttpClient,private router:Router) { }
  addToCart(product: any) {
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
  }
  getTotalAmount() {
    let grandTotal = 0;
    this.cartDataList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal
  }

  getCountCart(){
   let rdata={
      "userid": 1
    }
    this.postRequestUrl01(rdata, "EcartCustomerCart/CartCount").subscribe(res=>{
       this.setcountCartval(res.data.Totalcount);
    })
    return this.countdata;
  }

  
  getCartList() {
    return this.http.get<any>("http://localhost:3000/Cart/").pipe(map((res: any) => {
      return res;
    }))

  }

  deleteCart(id: number) {
    return this.http.delete<any>("http://10.130.34.149/Ekart/api/EcartCustomerCart/DeleteCart" + id).pipe(map((res: any) => {
      return res;
    }))
  }


  getCartItemCount(){
    let rdata={
      "userid": 1
    }
   return this.postRequestUrl01(rdata,'EcartCustomerCart/CartCount').pipe(map((res:any)=>{
    return res;
  }))
  }
  // api calling start
  baseUrl01 = environment.baseUrl01;
  postRequestUrl01(data: any, ACTION: string) { 
   ACTION = `${this.baseUrl01}` + ACTION; 
  var  result = this.http.post<any>(ACTION, data); 
  return result;
}

isSellerLoggedIn= new BehaviorSubject<boolean>(false);
isLoginError= new EventEmitter<boolean>(false)

userSignUp(data:SignUp){
  this.http.post('http://localhost:3000/seller',
  data,
  {observe:'response'}).subscribe((result)=>{
    console.warn(result)
    if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['Admin/Dashboard'])
    }
  })
} 
reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoggedIn.next(true)
    this.router.navigate(['Admin/Dashboard'])
  }
}
userLogin(data:login){
 this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
 {observe:'response'}).subscribe((result:any)=>{
  console.warn(result)
  if(result && result.body && result.body.length===1){
    this.isLoginError.emit(false)
    localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['Admin/Dashboard'])
  }else{
    console.warn("login failed");
    this.isLoginError.emit(true)
  }
 })
}


}



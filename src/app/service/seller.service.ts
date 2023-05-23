import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../signup';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
 @Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient,private route:Router) { }
  userSignUp(data:SignUp){
    this.http.post('http://localhost:3000/seller',data , {observe:'response'}).
    subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.route.navigateByUrl('/Admin/Dashboard')
      console.warn(result)
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigateByUrl('/Admin/Dashboard')
    }
  }
}

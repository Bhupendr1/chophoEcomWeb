import { NgModule, } from '@angular/core';
import { RouterModule, Routes,CanActivate  } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home/home.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './Auth/admin/admin.component';
import { AdminpanelComponent } from './Auth/admin/adminpanel/adminpanel.component';
import { HeaderComponent } from './_layout/Web-Header/header.component';
import { WebLayoutComponent } from './_layout/web-layout/web-layout.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { DataTableComponent } from './Auth/admin/data-table/data-table.component';
import { AddCategoryComponent } from './Auth/admin/add-category/add-category.component';
import { AuthGuard } from './service/course.guard.service';
const routes: Routes = [
//Site routes goes here 
{ 
  path: '',
  component:WebLayoutComponent,
  // canActivateChild:[AuthGuard],
  children: [
      {path:'', component: HomeComponent},
      {path:'cart',component:CartComponent},
      {path:'Checkout',component:CheckoutComponent},
      {path:'Message',component:MessageComponent},
      {path:'productss',component:ProductComponent},
      {path:'order',component:OrderComponent},
      ]
},

 // App routes goes here here
 { 
  path: 'Admin',
  component: AdminLayoutComponent, 
  // canActivateChild:[AuthGuard],
  children: [
    { path: 'Dashboard', component: DataTableComponent},
    { path: 'addCategory', component: AddCategoryComponent}
  ]
},
{ path: 'AdminLogin', component: AdminComponent},
      // otherwise redirect to 404 component
    {
      path:'**', component:NotfoundComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

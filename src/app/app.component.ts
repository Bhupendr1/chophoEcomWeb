import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationStart } from '@angular/router';
import { environment } from './../environments/environment';
import { SellerService } from './service/seller.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHead: boolean =true;


  constructor(
    private router: Router,
    translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    private seller:SellerService
    ) {
    translate.addLangs(['products', 'tamil']);
    translate.setDefaultLang('products');
    translate.use('products');
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '') {
            this.showHead = false;
          } 
          else {
            this.showHead;
          }
        }
      });
    }
    ngOnInit():void {
      this.primengConfig.ripple = true;
      this

  }
    }


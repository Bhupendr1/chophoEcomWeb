import { Component } from '@angular/core';
import { ProductserviceService } from '../service/productservice.service';
import { submitReq } from '../product';
import { NgForm } from '@angular/forms';
import { state, style, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {

  constructor(private product: ProductserviceService, private route:Router) { }
  ngOnInit(): void {

  }
  onSubmit(f: NgForm) {
    // stop here if form is invalid
    if (f.invalid) {
        return;
    }
    this.route.navigateByUrl('/Message');
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(f.value, null, 4));
}
}

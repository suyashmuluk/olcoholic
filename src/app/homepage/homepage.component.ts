import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import Product from '../models/product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products: Product[];
  username = '';
  isLoggedin = false;

  constructor(private getProduct: GetproductsService, private router: Router) { }

  ngOnInit() {
    this.getproductList();
    this.getUserLoginData();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    }
  }

  buy(value) {
    this.router.navigate(['/buy'], {
      queryParams: {
        id: value.id,
        name: value.name,
        desc: value.description,
        price: value.price
      }
    });
  }
}

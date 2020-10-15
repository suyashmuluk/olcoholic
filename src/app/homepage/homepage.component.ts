import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products = [];
  username = '';
  isLoggedin = false;

  constructor(private getProduct: GetproductsService, private router: Router) { }

  ngOnInit() {
    this.getproductList();
    this.getUserLoginData();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe(data => {
      this.products = data['product'];
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

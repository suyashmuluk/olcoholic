import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productSearch: string;
  products = [];
  isLoggedin = false;
  custId: string;
  randomId = "";

  constructor(private getProduct: GetproductsService, private router: Router, private snackBar: MatSnackBar, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getproductList();
    this.getUserLoginData();
    this.generateId();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe(data => {
      this.products = data['product'];
      console.log(this.products);
    });
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    }
  }

  generateId() {
    this.randomId = "ol" + Math.random().toString(36).substring(2, 8);
    console.log(this.randomId);
  }

  addToBasket(value) {
    const productInfo = {
      id: value.id,
      name: value.name,
      desc: value.description,
      price: value.price
    }
    if (this.isLoggedin) {
      this.basketService.addBasketProduct(this.randomId, productInfo).subscribe(() => { })
      console.log("added to basket");
    } else {
      const unsuccessRef = this.snackBar.open("You are not logged in or Registered yet", "OK", {
        duration: 2000
      });
      this.router.navigate(['/login']);
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

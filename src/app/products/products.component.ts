import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import { BasketService } from '../shared/basket.service';
import { CustomerService } from '../shared/customer.service';
import Basket from '../models/basket';
import Product from '../models/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  basket: Basket[];
  sidebarListItems = false;
  username = '';
  isLoggedin = false;
  custId: string;

  constructor(private getProduct: GetproductsService, private router: Router, private snackBar: MatSnackBar, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getproductList();
    this.getUserLoginData();
    // this.getBasketList();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  // getBasketList() {
  //   this.custId = this.basket['_custId'];
  //   this.basketService.getBasketProducts(this.custId).subscribe((basket: Basket[]) => {
  //     this.basket = basket;
  //     console.log(this.basket);
  //   });
  // }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
      this.username = localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData');
    }
  }

  toggleSidebar(value) {
    if (value === 'open') {
      document.getElementById('sidebar').classList.add('toggleSidebar');
      setTimeout(() => {
        this.sidebarListItems = true;
      }, 400);
    } else if (value === 'close') {
      this.sidebarListItems = false;
      document.getElementById('sidebar').classList.remove('toggleSidebar');
    }
  }

  addToWishlist() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    } else {
      const unsuccessfull = this.snackBar.open("You are not Logged in or Registered yet", "OK", {
        duration: 2000
      });
      this.router.navigate(['/login']);
    }
  }

  // addToBasket(value) {
  //   for (let basketProd of this.basket) {
  //     this.custId = basketProd['_custId'];
  //     this.basketService.addBasketProduct(this.custId, {
  //       id: value.id,
  //       name: value.name,
  //       desc: value.description,
  //       price: value.price
  //     }).subscribe(() => { });
  //   }
  // }

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

  logOut() {
    localStorage.removeItem('registrationData');
    localStorage.removeItem('temporaryUserData');
    window.location.reload();
    this.isLoggedin = false;
  }

}

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
  filterBox = false;
  basketLength: number;
  loader = false;

  constructor(private getProduct: GetproductsService, private router: Router, private snackBar: MatSnackBar, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getproductList();
    this.getUserLoginData();
  }

  getproductList() {
    this.loader = true;
    this.getProduct.getProducts().subscribe(data => {
      this.products = data['product'];
      this.loader = false;
    });
  }

  getUserLoginData() {
    if (localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    }
  }

  toggleFilterBox() {
    this.filterBox = !this.filterBox;
  }


  addToBasket(value) {
    if (this.isLoggedin) {
      this.basketService.addBasketProduct(JSON.parse(localStorage.getItem('temporaryUserData')).username, {
        name: value.name,
        description: value.description,
        price: value.price
      }).subscribe(data => {
        this.getBasketProduct();
        this.snackBar.open(data['basket']['name'] + " is added to basket", "OK", {
          duration: 2000
        })
      })
    } else {
      this.snackBar.open("You are not logged in or Registered yet", "OK", {
        duration: 2000
      });
      this.router.navigate(['/login']);
    }
  }

  getBasketProduct() {
    this.basketService.getBasketProducts(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.basketLength = data['basket'].length;
    });
  }

  buy(value) {
    this.router.navigate(['/buy'], {
      queryParams: {
        id: value._id,
        name: value.name,
        desc: value.description,
        price: value.price
      }
    });
  }

}

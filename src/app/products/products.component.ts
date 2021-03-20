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
  basket: any;

  constructor(private getProduct: GetproductsService, private router: Router, private snackBar: MatSnackBar, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getproductList();
    this.getUserLoginData();
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
        this.basketProduct();
        this.snackBar.open(data['basket']['name'] + " is added to basket", "OK", {
          duration: 2000
        });
      })
    } else {
      this.snackBar.open("You are not logged in or Registered yet", "OK", {
        duration: 2000
      });
      this.router.navigate(['/login']);
    }
  }

  basketProduct() {
    this.basketService.getBasketProducts(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.basket = data['basket'];
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

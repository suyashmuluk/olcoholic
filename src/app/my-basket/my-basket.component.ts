import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-basket',
  templateUrl: './my-basket.component.html',
  styleUrls: ['./my-basket.component.scss']
})

export class MyBasketComponent implements OnInit {
  basketProducts = [];
  basketLength: number;

  constructor(private basketService: BasketService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getBasketProduct();
  }

  getBasketProduct() {
    this.basketService.getBasketProducts(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.basketProducts = data['basket'];
      this.basketLength = data['basket'].length;
    });
  }

  deleteBasketProduct(value) {
    this.basketService.deleteBasketProduct(JSON.parse(localStorage.getItem('temporaryUserData')).username, value._id).subscribe(() => {
      this.getBasketProduct();
      this.snackBar.open("Product removed from basket", "OK", {
        duration: 2000
      });
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

import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-basket',
  templateUrl: './my-basket.component.html',
  styleUrls: ['./my-basket.component.scss']
})
export class MyBasketComponent implements OnInit {
  basketProducts = [];

  constructor(private basketService: BasketService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getBasketProduct();
  }

  getBasketProduct() {
    this.basketService.getBasketProducts(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.basketProducts = data['basket'];
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

}

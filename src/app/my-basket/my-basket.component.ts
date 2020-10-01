import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import Basket from '../models/basket';

@Component({
  selector: 'app-my-basket',
  templateUrl: './my-basket.component.html',
  styleUrls: ['./my-basket.component.scss']
})
export class MyBasketComponent implements OnInit {
  basket: Basket[];
  prodId: string;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketProduct();
  }

  basketProduct() {
    this.basketService.getBasketProducts(this.prodId).subscribe((basket: Basket[]) => {
      this.basket = basket;
      console.log(this.basket);
    })
  }

}

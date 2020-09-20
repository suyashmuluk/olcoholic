import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import Product from '../models/product';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products: Product[];
  constructor(private getProduct: GetproductsService) { }

  ngOnInit() {
    this.getproductList();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}

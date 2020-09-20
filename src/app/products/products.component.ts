import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import Product from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  sidebarListItems = false;

  constructor(private getProduct: GetproductsService) { }

  ngOnInit(): void {
    this.getproductList();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
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

}

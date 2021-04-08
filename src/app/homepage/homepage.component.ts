import { Component, OnInit } from '@angular/core';
import { GetproductsService } from '../shared/getproducts.service';
import { Router } from '@angular/router';
import { ContactService } from '../shared/contact.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products = [];
  username = '';
  isLoggedin = false;
  reviewList = [];

  constructor(private getProduct: GetproductsService, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.getproductList();
    this.getCustomerReviews();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe(data => {
      this.products = data['product'];
    });
  }

  getCustomerReviews() {
    this.contactService.getContactData().subscribe(data => {
      this.reviewList = data['contact'];
    });
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

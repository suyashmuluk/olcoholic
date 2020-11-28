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
    this.getUserLoginData();
    this.getCustomerReviews();
    this.reduceImageSize();
  }

  getproductList() {
    this.getProduct.getProducts().subscribe(data => {
      this.products = data['product'];
    });
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    }
  }

  getCustomerReviews() {
    this.contactService.getContactData().subscribe(data => {
      this.reviewList = data['contact'];
    })
  }

  reduceImageSize() {
    const background = document.getElementById('landing_page');
    window.addEventListener('scroll', () => {
      background.style.backgroundSize = 100 - +window.pageYOffset / 16 + '%';
      background.style.opacity = 1 - +window.pageYOffset / 1500 + '';
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

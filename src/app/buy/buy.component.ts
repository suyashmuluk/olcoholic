import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  productName = '';
  productDesc = '';
  productPrice: any = '';
  totalPrice = 0;
  quantity = 1;
  buyProduct: FormGroup;
  paymentField: FormGroup;
  reviewForm: FormGroup;
  isLoggedin = false;
  onlinePaymentSection = true;
  reviews = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private orderService: OrderService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getproductInfo();
    this.totalPrice = parseInt(this.productPrice);
    this.productForm();
    this.paymentForm();
    this.createreviewForm();
    this.getUserLoginData();
    this.getUSerReviews();
  }

  getproductInfo() {
    this.productName = this.route.snapshot.queryParamMap.get('name');
    this.productDesc = this.route.snapshot.queryParamMap.get('desc');
    this.productPrice = this.route.snapshot.queryParamMap.get('price');
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    }
  }

  getUSerReviews() {
    this.customerService.getCustomersReview().subscribe((data) => {
      this.reviews = data['review'];
    });
  }

  productForm() {
    this.buyProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      flat_no: ['', [Validators.required]],
      apartment: ['', [Validators.required]],
      area: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      product_quantity: [{ value: "1", disabled: true }, Validators.required]
    });
  }

  paymentForm() {
    this.paymentField = this.formBuilder.group({
      name_on_card: ['', Validators.required],
      card_number: ['', [Validators.required]],
      expiry_date: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  createreviewForm() {
    this.reviewForm = this.formBuilder.group({
      review: ['', Validators.required]
    });
  }

  get productFormControls() {
    return this.buyProduct.controls;
  }

  get paymentFormControls() {
    return this.paymentField.controls;
  }

  get createreviewFormControls() {
    return this.reviewForm.controls;
  }

  changeCount(value) {
    if (value === '-') {
      if (this.quantity > 1) {
        this.quantity--;
        this.totalPrice -= this.productPrice;
      }
    } else if (value === "+") {
      this.quantity++;
      this.totalPrice += +this.productPrice;
    }
  }

  order() {
    if (this.buyProduct.invalid) {
      this.buyProduct.setErrors({
        isInvalid: true
      });
    } else if (this.isLoggedin) {
      this.orderService.addOrder(JSON.parse(localStorage.getItem('temporaryUserData')).username, this.buyProduct.value).subscribe((data) => {
        console.log(data['order']);
      });
      const successfull = this.snackBar.open("Your order successfull", "OK", {
        duration: 2000
      });
    } else {
      this.router.navigate(['/login']);
      const unsuccessfull = this.snackBar.open("You are not logged in or Registered yet", "OK", {
        duration: 2000
      });
      console.log("order unsuccessfull");
    }
  }

  selectPaymentMethod(value, event) {
    if (value === 'cod') {
      this.onlinePaymentSection = false;
    } else {
      this.onlinePaymentSection = true;
    }
  }

  postReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.setErrors({
        isInvalid: true
      });
    } else if (this.isLoggedin) {
      this.customerService.addReview({ full_name: JSON.parse(localStorage.getItem('temporaryUserData')).full_name, review: this.reviewForm.value.review }).subscribe(() => { })
      const reviewPost = this.snackBar.open("Thanks for your review", "OK", { duration: 2000 });
      this.reviewForm.reset();
    } else {
      const reviewFailed = this.snackBar.open("You have to be logged in/ registered first", "OK", { duration: 2000 });
      this.router.navigate(['/login']);
    }
  }

}

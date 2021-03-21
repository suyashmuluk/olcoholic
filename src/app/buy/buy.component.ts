import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { CustomerService } from '../shared/customer.service';
import { GetproductsService } from '../shared/getproducts.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  product_id = '';
  productName = '';
  productDesc = '';
  productPrice: any = '';
  totalPrice = 0;
  quantity = 1;
  buyProduct: FormGroup;
  reviewForm: FormGroup;
  isLoggedin = false;
  onlinePaymentSection = true;
  reviews = [];

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: GetproductsService) { }

  ngOnInit(): void {
    this.getproductInfo();
    this.totalPrice = parseInt(this.productPrice);
    this.productForm();
    this.createreviewForm();
    this.getUserLoginData();
    this.getUSerReviews();
  }

  getproductInfo() {
    this.product_id = this.route.snapshot.queryParamMap.get('id');
    this.productName = this.route.snapshot.queryParamMap.get('name');
    this.productDesc = this.route.snapshot.queryParamMap.get('desc');
    this.productPrice = this.route.snapshot.queryParamMap.get('price');
  }

  getUserLoginData() {
    if (localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
      this.populateForm();
    }
  }

  populateForm() {
    this.buyProduct.patchValue({
      name: JSON.parse(localStorage.getItem('temporaryUserData')).full_name,
      email: JSON.parse(localStorage.getItem('temporaryUserData')).email
    });
  }

  getUSerReviews() {
    this.productService.getProductReview(this.product_id).subscribe((data) => {
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
      product_quantity: [{ value: "1", disabled: true }, Validators.required],
      name_on_card: ['', Validators.required],
      card_number: ['', [Validators.required]],
      expiry_date: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  createreviewForm() {
    this.reviewForm = this.formBuilder.group({
      review: ['', Validators.required]
    });
  }

  get productFormControls() {
    return this.buyProduct.controls;
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
      this.orderService.addOrder(
        JSON.parse(localStorage.getItem('temporaryUserData')).username,
        {
          name: this.buyProduct.value.name,
          email: this.buyProduct.value.email,
          flat_no: this.buyProduct.value.flat_no,
          apartment: this.buyProduct.value.apartment,
          area: this.buyProduct.value.area,
          landmark: this.buyProduct.value.landmark,
          city: this.buyProduct.value.city,
          state: this.buyProduct.value.state,
          zip: this.buyProduct.value.zip,
          product_name: this.productName,
          product_quantity: this.quantity,
          total_price: this.totalPrice,
          name_on_card: this.buyProduct.value.name_on_card,
          card_number: this.buyProduct.value.card_number,
          expiration_date: this.buyProduct.value.expiry_date,
          cvv: this.buyProduct.value.cvv,
        }).subscribe(data => {
          this.snackBar.open("Your order successfull", "OK", {
            duration: 2000
          });
          this.router.navigate(['recent-shopping']);
          this.buyProduct.markAsPristine();
        });
    } else {
      this.router.navigate(['login']);
      this.snackBar.open("You are not logged in or Registered yet", "OK", {
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
      this.customerService.addReview({
        full_name: JSON.parse(localStorage.getItem('temporaryUserData')).full_name,
        review: this.reviewForm.value.review,
        product_name: this.route.snapshot.queryParamMap.get('name')
      }).subscribe(() => {
        this.snackBar.open("Thanks for your review", "OK", { duration: 2000 });
        this.getUSerReviews();
        this.reviewForm.reset();
      });
    } else {
      this.snackBar.open("You have to be logged in/ registered first", "OK", { duration: 2000 });
      this.router.navigate(['/login']);
    }
  }

}

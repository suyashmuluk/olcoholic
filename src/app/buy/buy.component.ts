import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import Customer from '../models/customer';

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
  isLoggedin = false;
  customerList: Customer[];
  custId: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getproductInfo();
    this.totalPrice = parseInt(this.productPrice);
    this.productForm();
    this.getCustomerDetails();
  }

  getproductInfo() {
    this.productName = this.route.snapshot.queryParamMap.get('name');
    this.productDesc = this.route.snapshot.queryParamMap.get('desc');
    this.productPrice = this.route.snapshot.queryParamMap.get('price');
  }

  getCustomerDetails() {
    this.customerService.getCustomers().subscribe((customerList: Customer[]) => {
      this.customerList = customerList;
      this.custId = customerList['_id'];
    })
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

  get productFormControls() {
    return this.buyProduct.controls;
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
    } else if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.customerService.buyProduct(this.custId, { formData: this.buyProduct.value, quantity: this.totalPrice }).subscribe(result => {
        console.log(result);
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

}

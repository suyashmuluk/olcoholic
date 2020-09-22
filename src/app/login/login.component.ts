import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import Customer from '../models/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  customerList: Customer[];
  errorMessage = false;
  usernameError = false;
  openEye = true;
  inputType = 'password';

  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    this.getUserData();
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  getUserData() {
    this.customerService.getCustomers().subscribe((customerList: Customer[]) => {
      this.customerList = customerList;
    });
  }

  togglePassword(value) {
    if (value === 'show') {
      this.openEye = false;
      this.inputType = 'text';
    } else if (value === 'hide') {
      this.openEye = true;
      this.inputType = 'password';
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.setErrors({
        isInvalid: true
      });
    } else {
      for (let customer of this.customerList) {
        if (this.loginForm.value.username !== customer['username']) {
          this.usernameError = true;
        } else if (this.loginForm.value.password !== customer['password']) {
          this.errorMessage = true;
        } else if (this.loginForm.value.username === customer['username'] && this.loginForm.value.password === customer['password']) {
          this.usernameError = false;
          this.errorMessage = false;
          this.router.navigate(['/']);
          localStorage.setItem('temporaryUserData', this.loginForm.value.username);
        }
      }
    }
  }

}

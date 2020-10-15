import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  customerList = [];
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
  }

  get loginFormControls() {
    return this.loginForm.controls;
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
      this.customerService.loginCustomer({ username: this.loginForm.value.username, password: this.loginForm.value.password }).subscribe(() => {
        console.log("login successful");
      });
      localStorage.setItem('temporaryUserData', this.loginForm.value.username);
    }
  }
}

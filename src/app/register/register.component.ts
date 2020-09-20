import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import Customer from '../models/customer';
import { MustMatch } from './password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerSteps = "personalInfo";
  errorMessage = false;
  personalInfo = true;
  credentialInfo = false;
  passwordInfo = false;
  customerList: Customer[];

  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: ['', [Validators.required]],
    }, {
      validators: MustMatch('password', 'confirm_password')
    });
    this.getUserData();
  }

  getUserData() {
    this.customerService.getCustomers().subscribe((customerList: Customer[]) => {
      this.customerList = customerList;
    });
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.setErrors({
        isInvalid: true
      });
    } else {
      this.router.navigate(['/']);
      localStorage.setItem('registrationData', JSON.stringify(this.registerForm.value));
      this.customerService.addCustomer(this.registerForm.value).subscribe(() => {
      });
    }
  }

  backStep(value) {
    if (value === 'credential_info') {
      this.personalInfo = true;
      this.credentialInfo = false;
      this.passwordInfo = false;
    } else if (value === 'password_info') {
      this.personalInfo = false;
      this.credentialInfo = true;
      this.passwordInfo = false;
    }
  }

  nextStep(value) {
    if (value === 'peronsal_info') {
      if (this.registerForm.controls.full_name.valid && this.registerForm.controls.dob.valid) {
        this.personalInfo = false;
        this.credentialInfo = true;
        this.passwordInfo = false;
        this.errorMessage = false;
      } else {
        this.errorMessage = true;
        return false;
      }
    } else if (value === 'credential_info') {
      for (let customer of this.customerList) {
        if (this.registerForm.value.username === customer['username']) {
          this.credentialInfo = true;
          this.passwordInfo = false;
          this.errorMessage = true;
        } else {
          if (this.registerForm.controls.username.valid && this.registerForm.controls.email.valid) {
            this.personalInfo = false;
            this.credentialInfo = false;
            this.passwordInfo = true;
            this.errorMessage = false;
          } else {
            this.errorMessage = true;
            return false;
          }
        }
      }
    }
  }

}

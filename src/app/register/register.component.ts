import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { MustMatch } from './password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage = false;
  usernameError = false;
  emailError = false;
  personalInfo = true;
  credentialInfo = false;
  passwordInfo = false;
  passwordType = 'password';
  confPasswordType = 'password';
  openEye = true;
  openEyeConf = true;
  customerList = [];
  customer: any;
  idString = "ol";
  randomId = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService, private snackBar: MatSnackBar) { }

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
    this.customerService.getCustomers().subscribe(data => {
      this.customerList = data['customer'];
      console.log(this.customerList);
    });
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  togglePassword(type, value) {
    if (type === 'password') {
      if (value === 'show') {
        this.passwordType = 'text';
        this.openEye = false;
      } else if (value === 'hide') {
        this.passwordType = 'password';
        this.openEye = true;
      }
    } else if (type === 'conf_password') {
      if (value === 'show') {
        this.confPasswordType = 'text';
        this.openEyeConf = false;
      } else if (value === 'hide') {
        this.confPasswordType = 'password';
        this.openEyeConf = true;
      }
    }
  }

  nextStep(value) {
    if (value === 'peronsal_info') {
      if (this.registerForm.controls.full_name.valid && this.registerForm.controls.dob.valid) {
        document.getElementById("step1").classList.add("step_after_success");
        setTimeout(() => {
          this.personalInfo = false;
          this.credentialInfo = true;
        }, 300);
      } else {
        this.errorMessage = true;
        return false;
      }
    } else if (value === "credential_info") {
      for (let customer of this.customerList) {
        if (this.registerForm.value.username === customer['username']) {
          this.usernameError = true;
          return false;
        } else if (this.registerForm.value.email === customer['email']) {
          this.emailError = true;
          return false;
        } else if (this.registerForm.controls.username.valid && this.registerForm.controls.email.valid) {
          document.getElementById("step2").classList.add("step_after_success");
          setTimeout(() => {
            this.usernameError = false;
            this.emailError = false;
            this.credentialInfo = false;
            this.passwordInfo = true;
          }, 300)
        } else {
          this.errorMessage = true;
          return false;
        }
      }
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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.setErrors({
        isInvalid: true
      });
    } else {
      this.customerService.addCustomer(this.registerForm.value).subscribe((data) => {
        this.customer = data['customer'];
        console.log(this.customer);
        localStorage.setItem('registrationData', JSON.stringify(this.customer));
        this.router.navigate(['/']);
      });
    }
  }
}

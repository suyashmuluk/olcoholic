import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isLoggedin = false;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private contactService: ContactService) { }

  ngOnInit() {
    this.contactFormGenerate();
    this.getUserLoginData();
    if (this.isLoggedin) {
      this.populateForm();
    }
  }

  contactFormGenerate() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  get contactFormControls() {
    return this.contactForm.controls;
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
    }
  }

  populateForm() {
    this.contactForm.patchValue({
      name: JSON.parse(localStorage.getItem('temporaryUserData')).full_name,
      email: JSON.parse(localStorage.getItem('temporaryUserData')).email
    })
  }

  submitContactForm() {
    if (this.contactForm.invalid) {
      this.contactForm.setErrors({
        isInvalid: true
      });
    } else {
      this.contactService.submitContactFormInfo(this.contactForm.value).subscribe(() => {
        this.contactForm.reset();
      });
      const successRef = this.snackBar.open("Thanks for your opinion", "OK", { duration: 2000 })
    }
  }

}

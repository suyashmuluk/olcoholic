import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedin = false;
  username = '';

  constructor() { }

  ngOnInit() {
    this.getUserLoginData();
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
      this.username = localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData');
    }
  }

  toggleNavbar() {
    const nav_items = document.querySelector('.custom_navbar__list');
    const nav_links = document.querySelectorAll(".custom_navbar__list li");

    nav_items.classList.toggle('open');
    nav_links.forEach((link) => {
      link.classList.toggle('fade_in');
    });
    document.querySelector(".custom_navbar__hamburger_line1").classList.toggle("line1");
    document.querySelector(".custom_navbar__hamburger_line2").classList.toggle("line2");
    document.querySelector(".custom_navbar__hamburger_line3").classList.toggle("line3");
  }

  logOut() {
    localStorage.removeItem('registrationData');
    localStorage.removeItem('temporaryUserData');
    window.location.reload();
    this.isLoggedin = false;
  }

}

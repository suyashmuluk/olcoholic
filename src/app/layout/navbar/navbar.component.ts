import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges {
  @Input() basketProductsCount: number;
  basketLength: any;
  isLoggedin = false;
  username = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getUserLoginData();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'basketProductsCount') {
        this.basketLength = this.basketProductsCount;
      }
    }
  }

  getUserLoginData() {
    if (JSON.parse(localStorage.getItem('temporaryUserData'))) {
      this.isLoggedin = true;
      this.username = JSON.parse(localStorage.getItem('temporaryUserData')).username;
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
    localStorage.removeItem('temporaryUserData');
    this.router.navigate(['/']);
    window.location.reload();
    this.isLoggedin = false;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}

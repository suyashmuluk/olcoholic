import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarListItems = false;
  username = '';
  isLoggedin = false;
  basketLength: any;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.getUserLoginData();
    this.getBasketProduct();
  }

  getUserLoginData() {
    if (JSON.parse(localStorage.getItem('temporaryUserData')) || localStorage.getItem('registrationData')) {
      this.isLoggedin = true;
      this.username = JSON.parse(localStorage.getItem('temporaryUserData')).username || JSON.parse(localStorage.getItem('registrationData')).username;
    }
  }

  getBasketProduct() {
    this.basketService.getBasketProducts(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.basketLength = data['basket'].length;
    })
  }

  toggleSidebar(value) {
    if (value === 'open') {
      document.getElementById('sidebar').classList.add('toggleSidebar');
      setTimeout(() => {
        this.sidebarListItems = true;
      }, 400);
    } else if (value === 'close') {
      this.sidebarListItems = false;
      document.getElementById('sidebar').classList.remove('toggleSidebar');
    }
  }

  logOut() {
    localStorage.removeItem('registrationData');
    localStorage.removeItem('temporaryUserData');
    window.location.reload();
    this.isLoggedin = false;
  }

}

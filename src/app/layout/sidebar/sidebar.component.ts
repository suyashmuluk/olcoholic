import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BasketService } from '../../shared/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {
  @Input() basketProductsCount: number;
  sidebarListItems = false;
  username = '';
  isLoggedin = false;
  basketLength: any;

  constructor(private basketService: BasketService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserLoginData();
    this.getBasketProduct();
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
    localStorage.removeItem('temporaryUserData');
    this.router.navigate(['/']);
    window.location.reload();
    this.isLoggedin = false;
  }

}

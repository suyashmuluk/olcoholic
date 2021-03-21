import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-recent-shopping',
  templateUrl: './recent-shopping.component.html',
  styleUrls: ['./recent-shopping.component.scss']
})
export class RecentShoppingComponent implements OnInit {
  orders = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.orders = data['order'];
    });
  }

}

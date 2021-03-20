import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-recent-shopping',
  templateUrl: './recent-shopping.component.html',
  styleUrls: ['./recent-shopping.component.scss']
})
export class RecentShoppingComponent implements OnInit {
  orders = [];

  constructor(private customerServise: CustomerService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(JSON.parse(localStorage.getItem('temporaryUserData')).username).subscribe(data => {
      this.orders = data['order'];
      console.log(this.orders);
    });
  }

}

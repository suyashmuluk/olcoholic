import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-recent-shopping',
  templateUrl: './recent-shopping.component.html',
  styleUrls: ['./recent-shopping.component.scss']
})
export class RecentShoppingComponent implements OnInit {

  constructor(private customerServise: CustomerService) { }

  ngOnInit(): void {
  }

}

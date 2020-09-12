import { Injectable } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { HttpClient } from '@angular/common/http';
// import { observable } from 'rxjs/observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  selectedCustomer: Customer;
  customers: Customer[];

  constructor() { }
}

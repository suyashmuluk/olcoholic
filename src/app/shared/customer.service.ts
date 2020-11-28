import { Injectable } from '@angular/core';
import { DbconnectService } from '../shared/dbconnect.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private dbConnect: DbconnectService) { }

  getCustomers() {
    return this.dbConnect.get('customers');
  }

  addCustomer(data: object) {
    return this.dbConnect.post('customers', data);
  }

  loginCustomer(data: object) {
    return this.dbConnect.post('customers/login', data);
  }

  deleteCustomer(id: string) {
    return this.dbConnect.delete(`customers/${id}`);
  }

  updateCustomerInfo(id: string, data: object) {
    return this.dbConnect.patch(`customers/${id}`, data);
  }

  getCustomersReview() {
    return this.dbConnect.get('reviews');
  }

  addReview(data: object) {
    return this.dbConnect.post(`reviews`, data);
  }

}

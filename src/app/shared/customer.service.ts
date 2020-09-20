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

  deleteCustomer(id: string) {
    return this.dbConnect.delete(`customers/${id}`);
  }

  updateCustomerInfo(id: string, full_name: string, dob: string, username: string, email: string, password: string, confirm_password: string) {
    return this.dbConnect.patch(`customers/${id}`, { full_name, dob, username, email, password, confirm_password });
  }
}

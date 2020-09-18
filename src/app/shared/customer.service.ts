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

  addCustomer(name: string, email: string, password: string) {
    return this.dbConnect.post('customers', { name, email, password });
  }

  deleteCustomer(id: string) {
    return this.dbConnect.delete(`customers/${id}`);
  }

  updateCustomerInfo(id: string, name: string, email: string, password: string) {
    return this.dbConnect.patch(`customers/${id}`, { name, email, password });
  }
}

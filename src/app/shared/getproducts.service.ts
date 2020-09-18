import { Injectable } from '@angular/core';
import { DbconnectService } from '../shared/dbconnect.service';


@Injectable({
  providedIn: 'root'
})
export class GetproductsService {

  constructor(private dbConnect: DbconnectService) { }

  getProducts() {
    return this.dbConnect.get('products');
  }

  addProduct(name: string, description: string, price: string) {
    return this.dbConnect.post('products', { name, description, price });
  }

  deleteProduct(id: string) {
    return this.dbConnect.delete(`products/${id}`);
  }

  updateProductInfo(id: string, name: string, description: string, price: string) {
    return this.dbConnect.patch(`products/${id}`, { name, description, price });
  }
}

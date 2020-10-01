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

  addProduct(data: object) {
    return this.dbConnect.post('products', data);
  }

  deleteProduct(id: string) {
    return this.dbConnect.delete(`products/${id}`);
  }

  updateProductInfo(id: string, data: object) {
    return this.dbConnect.patch(`products/${id}`, data);
  }
}

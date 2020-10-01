import { Injectable } from '@angular/core';
import { DbconnectService } from '../shared/dbconnect.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private dbConnect: DbconnectService) { }

  getBasketProducts(id: string) {
    return this.dbConnect.get(`customers/${id}/buyproducts`);
  }

  addBasketProduct(id: string, data: object) {
    return this.dbConnect.post(`customers/${id}/buyproducts`, { data })
  }

  deleteBasketProduct(id: string, productId: string) {
    return this.dbConnect.delete(`customers/${id}/buyproducts/${productId}`);
  }
}

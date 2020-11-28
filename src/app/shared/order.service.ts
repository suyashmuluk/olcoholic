import { Injectable } from '@angular/core';
import { DbconnectService } from '../shared/dbconnect.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private dbConnect: DbconnectService) { }

  addOrder(id: string, data: object) {
    return this.dbConnect.post(`customers/${id}/orders`, { data });
  }
}

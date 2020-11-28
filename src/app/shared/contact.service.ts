import { Injectable } from '@angular/core';
import { DbconnectService } from './dbconnect.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private dbConnect: DbconnectService) { }

  submitContactFormInfo(data: object) {
    return this.dbConnect.post('contacts', data);
  }

  getContactData() {
    return this.dbConnect.get('contacts');
  }
}

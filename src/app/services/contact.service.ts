import {Injectable} from '@angular/core';
import {Member} from '../models/Members';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _phone = "+39 3496711382";
  private _mail = "knotpoet@gmail.com";

  get phone() {
    return this._phone;
  }

  get mail() {
    return this._mail;
  }
}

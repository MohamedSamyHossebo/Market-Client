import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) { }
  creatNewCart(Model: any) {
    return this._http.post(environment.baseApi + 'carts', Model)
  }
}

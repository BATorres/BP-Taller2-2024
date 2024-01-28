import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient: HttpClient) { }

  getAllItemsInCart(): Observable<Cart[]> {
    return this._httpClient.get<Cart[]>('/api/cart');
  }

  countItemsInCart() {
    return this._httpClient.get('/api/cart/count');
  }

  createItemInCart(bookToAdd: Cart) {
    return this._httpClient.post('/api/cart', bookToAdd);
  }

  updateItemInCart() {
    const id = '';
    return this._httpClient.put(`/api/cart/${id}`, {});
  }

  deleteItemInCart(itemId: number) {
    return this._httpClient.delete(`/api/cart/${itemId}`);
  }
}

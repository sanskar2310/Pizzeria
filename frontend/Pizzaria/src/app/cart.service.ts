import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizzas } from './orderpizza/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getcartlist(): Observable<Pizzas[]> {
    return this.http.get<Pizzas[]>("http://localhost:9000/cartlist");
  }

  add_to_cart(item: any): Observable<any> {
    console.log("add_to_cart called.", item);
    return this.http.post("http://localhost:3003/addtocart", item, { responseType: "text" });
  }

  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/cartlist/deletefromcart/${itemId}`);
  }
  
  updateItemQuantity(itemId: string, action: string): Observable<any> {
    return this.http.put<any>(`http://localhost:3003/cartlist/updatecart/${itemId}`, { action });
  }
}

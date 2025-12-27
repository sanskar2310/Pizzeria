import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private cartser: CartService) {}

  getPizzas(): Observable<any> {
    console.log("Fetching pizzas from Server")
    return this.http.get<any>('http://localhost:9000/pizzas');
  }

  add_to_cart(item:any){
    return this.cartser.add_to_cart(item)
  }
}

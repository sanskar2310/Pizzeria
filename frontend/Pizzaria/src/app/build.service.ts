import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  constructor(private http:HttpClient, private cartser:CartService) { }

  getTopping(){
    console.log("Fetching toppings from Server..")
    return this.http.get("http://localhost:9000/toppings")
  }

  add_to_cart(cartData: any) {
    console.log('Adding pizza to cart:', cartData);
    return this.cartser.add_to_cart(cartData)
  }
}

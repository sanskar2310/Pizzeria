import { Component, OnInit } from '@angular/core';
import { Pizzas } from '../orderpizza/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartlist: Pizzas[] = [];
  totalprice: number = 0;

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.CartList();
  }

  CartList(): void {
    this.cs.getcartlist().subscribe((res) => {
      this.cartlist = res;
      this.updateTotalPrice();
    });
  }

  ensureSelectedToppingIsArray(item: any): any[] {
    if (Array.isArray(item.selectedTopping)) {
      return item.selectedTopping;
    } else if (item.selectedTopping) {
      return [item.selectedTopping];
    } else {
      return [];
    }
  }

  calculateTotalPrice(item:any): number{
    let total = item.price *(item.quantity || 1);
    let toppings = this.ensureSelectedToppingIsArray(item);
    total += toppings.reduce((sum:number, topping:any)=>sum+topping.price, 0)
    return total
  }

  updateTotalPrice(): void {
    this.totalprice = 0;
    this.cartlist.forEach((item: any) => {
      this.totalprice += this.calculateTotalPrice(item)
    });
  }

  removeItemFromCart(item: any): void {
    this.cs.removeFromCart(item.id).subscribe({
      next: (response) => {
        console.log("Delete Response:", response);
        if (response.success) {
          this.cartlist = this.cartlist.filter(cartItem => cartItem.id !== item.id);
          this.updateTotalPrice();
        } else {
          console.warn("Failed to remove item:", response.message);
        }
      },
      error: (err) => {
        console.error("Error removing item from cart:", err);
      }
    });
  }

  incrementQuantity(item: any): void {
    this.cs.updateItemQuantity(item.id, 'increment').subscribe({
      next: (updatedItem) => {
        item.quantity = updatedItem.quantity;
        this.updateTotalPrice();
      },
      error: (err) => {
        console.error("Error incrementing quantity:", err);
      }
    });
  }

  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      this.cs.updateItemQuantity(item.id, 'decrement').subscribe({
        next: (updatedItem) => {
          item.quantity = updatedItem.quantity;
          this.updateTotalPrice();
        },
        error: (err) => {
          console.error("Error decrementing quantity:", err);
        }
      });
    }
  }
}

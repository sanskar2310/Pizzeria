import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderpizza',
  templateUrl: './orderpizza.component.html',
  styleUrls: ['./orderpizza.component.css']
})
export class OrderpizzaComponent implements OnInit{
  pizzas: any;
  errorMessage: string | null = null;

  constructor(private pizzaorder: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.pizzaorder.getPizzas().subscribe(
      (data) => {
        console.log('Fetched pizzas:', data);
        this.pizzas = data;
      },
      (err) => {
        console.error('Error fetching pizzas:', err);
        this.errorMessage = 'Failed to load pizzas. Please try again later.';
      });
  }

  addtocart(pizza: any) {
    const wantToppings = window.confirm('Do you want to add extra toppings or not?');
    if (wantToppings) {
      localStorage.setItem('selectedPizza', JSON.stringify(pizza));
      console.log('Selected pizza saved:', pizza);
      alert('Pizza selected. You can now add toppings from build your pizza!');
      this.router.navigate(['/build']);
    } else {
      this.pizzaorder.add_to_cart(pizza).subscribe((res) => {
        console.log(res);
      });
      alert('Pizza added to cart!');
    }
  }

  getIngredients(ingredients: any[]): string {
    if (!ingredients) return '';
    return ingredients
      .map(obj =>
        Object.entries(obj)
          .filter(([key, value]) => key !== '_id' && typeof value === 'string')
          .map(([_, value]) => value)
          .join('')
      ).join(', ');
  }

  getToppings(toppings: any[]): string {
    if (!toppings) return '';
    return toppings
      .map(obj =>
        Object.entries(obj)
          .filter(([key, value]) => key !== '_id' && typeof value === 'string')
          .map(([_, value]) => value)
          .join('')
      ).join(', ');
  }
}

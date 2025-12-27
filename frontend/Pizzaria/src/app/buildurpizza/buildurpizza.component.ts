import { Component, OnInit } from '@angular/core';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-buildurpizza',
  templateUrl: './buildurpizza.component.html',
  styleUrls: ['./buildurpizza.component.css']
})
export class BuildurpizzaComponent implements OnInit {
  toppings: any;
  errorMessage: string | null = null;
  totalprice: number = 0;
  selectedPizza: any;

  constructor(private bs: BuildService) {}

  ngOnInit(): void {
    this.bs.getTopping().subscribe(
      (data) => {
        console.log('Fetched toppings:', data);
        this.toppings = data;
      },
      (err) => {
        console.error('Error fetching toppings:', err);
        this.errorMessage = 'Failed to load toppings. Please try again later.';
      }
    );
    this.selectedPizza = JSON.parse(localStorage.getItem('selectedPizza') || 'null');
  }

  updatetopTotalPrice(): void {
    this.totalprice = this.toppings
      .filter((topping: any) => topping.selected)
      .reduce((total: number, topping: any) => total + topping.price, 0);
  }

  buildPizza(): void {
    if (!this.selectedPizza) {
      alert('Please select a pizza first before building your pizza.');
      return;
    } else {
      const selectedToppings = this.toppings.filter((topping: any) => topping.selected);
      if (selectedToppings.length === 0) {
        alert('Please select at least one topping to build your pizza.');
        return;
      }
      this.selectedPizza.selectedTopping = selectedToppings;
      this.totalprice = this.selectedPizza.price + selectedToppings.reduce((total: number, topping: any) => total + topping.price, 0);
      this.bs.add_to_cart(this.selectedPizza).subscribe(
        (res) => {
          console.log('Pizza with toppings added to cart:', res);
          alert('Your pizza has been added to the cart successfully!');
          localStorage.removeItem('selectedPizza');
        },
        (err) => {
          console.error('Error adding pizza to the cart:', err);
          alert('Failed to add pizza to the cart. Please try again.');
        }
      );
    }
  }  
}

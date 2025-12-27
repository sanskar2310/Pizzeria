export interface Pizzas {
  id: string;
  type: string;
  price: number;
  name: string;
  image: string;
  description: string;
  ingredients: [{
    id: string;
    iname: string;
  }];
  topping: [{
    id: string;
    tname: string;
    price: string;
  }];
  quantity: number;
  selectedTopping?: [{
    id: number;
    tname: string;
    price: number;
    image: string;
  }];
}

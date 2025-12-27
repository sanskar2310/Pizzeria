import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderpizzaComponent } from './orderpizza/orderpizza.component';
import { BuildurpizzaComponent } from './buildurpizza/buildurpizza.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'order', component: OrderpizzaComponent },
  { path: 'build', component: BuildurpizzaComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

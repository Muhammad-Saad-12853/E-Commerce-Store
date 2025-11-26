import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartState, RemoveFromCart, UpdateQuantity } from '../../../states/cart.state';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private store = inject(Store);

  cartItems = this.store.selectSignal(CartState.getCartItems);
  totalPrice = this.store.selectSignal(CartState.getTotalPrice);

  removeFromCart(productId: number) {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  updateQuantity(productId: number, quantity: number) {
    // Checking the negative qauntity and value 
    if (quantity < 1) {
      return;
    }
    this.store.dispatch(new UpdateQuantity(productId, quantity));
  }
}

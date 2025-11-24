import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStateModel {
  items: CartItem[];
}

// Actions
export class AddToCart {
  static readonly type = '[Cart] Add to Cart';
  constructor(public product: Product) { }
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove from Cart';
  constructor(public productId: number) { }
}

export class UpdateQuantity {
  static readonly type = '[Cart] Update Quantity';
  constructor(public productId: number, public quantity: number) { }
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CartState {
  @Selector()
  static getCartItems(state: CartStateModel) {
    return state.items;
  }

  @Selector()
  static getTotalPrice(state: CartStateModel) {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  @Selector()
  static getItemCount(state: CartStateModel) {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }

  @Action(AddToCart)
  addToCart(context: StateContext<CartStateModel>, action: AddToCart) {
    const state = context.getState();
    const existingItem = state.items.find((i) => i.product.id === action.product.id);

    if (existingItem) {
      const updatedItems = state.items.map((item) =>
        item.product.id === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      context.patchState({ items: updatedItems });
    } else {
      context.patchState({
        items: [...state.items, { product: action.product, quantity: 1 }],
      });
    }
  }

  @Action(RemoveFromCart)
  removeFromCart(context: StateContext<CartStateModel>, action: RemoveFromCart) {
    const state = context.getState();
    const updatedItems = state.items.filter((item) => item.product.id !== action.productId);
    context.patchState({ items: updatedItems });
  }

  @Action(UpdateQuantity)
  updateQuantity(context: StateContext<CartStateModel>, action: UpdateQuantity) {
    const state = context.getState();
    const updatedItems = state.items.map((item) =>
      item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
    );
    context.patchState({ items: updatedItems });
  }
}

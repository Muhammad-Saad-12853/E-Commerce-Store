import { Component, inject, signal, computed } from '@angular/core';
import { GetProductById, ProductsState } from '../../../states/product-state.state';
import { AddToCart } from '../../../states/cart.state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Product } from '../../../models/product';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: 'product-details.html',
  styleUrl: 'product-details.css',
})
export class ProductDetails {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  product = computed(() => {
    const products = this.store.selectSignal(ProductsState.selectProducts)();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return products.find((p) => p.id === id);
  });

  addToCart(product: Product) {
    this.store.dispatch(new AddToCart(product));
  }
}

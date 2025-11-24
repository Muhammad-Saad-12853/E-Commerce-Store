import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProducts, ProductsState } from '../../../states/product-state.state';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private store = inject(Store);
  private router = inject(Router);

  products = this.store.selectSignal(ProductsState.selectProducts);

  constructor() {
    this.store.dispatch(new GetProducts());
  }

  goToDetails(id: number) {
    this.router.navigate([`/product/${id}`]);
  }
}

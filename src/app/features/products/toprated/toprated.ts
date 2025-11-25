import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetProducts, ProductsState } from '../../../states/product-state.state';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toprated',
  imports: [CurrencyPipe],
  templateUrl: './toprated.html',
  styleUrl: './toprated.css',
})
export class Toprated implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  products = this.store.selectSignal(ProductsState.selectTopRatedProducts);

  ngOnInit() {
    this.store.dispatch(new GetProducts());
  }

  goToDetails(id: number) {
    this.router.navigate([`/product/${id}`]);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProducts, GetProductsByCategory, ProductsState } from '../../../states/product-state.state';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  products = this.store.selectSignal(ProductsState.selectProducts);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.store.dispatch(new GetProductsByCategory(category));
      } else {
        this.store.dispatch(new GetProducts());
      }
    });
  }

  goToDetails(id: number) {
    this.router.navigate([`/product/${id}`]);
  }
}

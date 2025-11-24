import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ApiService } from '../core/product-service';

//  Actions
export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class GetProductById {
  static readonly type = '[Product] Get Product By Id';
  constructor(public id: number) {}
}

//  State Model
export interface ProductsStateModel {
  products: Product[];
  selectedProduct: Product | null;
}

//  State
@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    selectedProduct: null,
  },
})
@Injectable()
export class ProductsState {
  constructor(private apiService: ApiService) {}

  //  Selectors
  @Selector()
  static selectProducts(state: ProductsStateModel) {
    return state.products;
  }

  @Selector()
  static selectProductById(state: ProductsStateModel) {
    return (id: number) =>
      state.products.find((p) => p.id === id) || state.selectedProduct;
  }

  //  Actions
  @Action(GetProducts)
  getProducts(context: StateContext<ProductsStateModel>) {
    return this.apiService.getProducts().pipe(
      tap((products) => {
        context.patchState({ products });
      })
    );
  }

  @Action(GetProductById)
  getProductById(context: StateContext<ProductsStateModel>, action: GetProductById) {
    return this.apiService.getProductById(action.id).pipe(
      tap((product) => {
        context.patchState({ selectedProduct: product });
      })
    );
  }
}

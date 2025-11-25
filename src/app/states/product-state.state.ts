// ActionsDefinition->StateModel->State->Selector->Action

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
  constructor(public id: number) { }
}

export class GetCategories {
  static readonly type = '[Product] Get Categories';
}

export class GetProductsByCategory {
  static readonly type = '[Product] Get Products By Category';
  constructor(public category: string) { }
}

//  State Model
export interface ProductsStateModel {
  products: Product[];
  selectedProduct: Product | null;
  categories: string[];
}

//  State
@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    selectedProduct: null,
    categories: [],
  },
})
@Injectable()
export class ProductsState {
  constructor(private apiService: ApiService) { }

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

  @Selector()
  static selectCategories(state: ProductsStateModel) {
    return state.categories;
  }

  @Selector()
  static selectTopRatedProducts(state: ProductsStateModel) {
    // return state.products.filter((p) => p.rating && p.rating.rate > 4.5);
      return state.products.filter((p) => p.rating.rate > 4.5);
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

  @Action(GetCategories)
  getCategories(context: StateContext<ProductsStateModel>) {
    return this.apiService.getCategories().pipe(
      tap((categories) => {
        context.patchState({ categories });
      })
    );
  }

  @Action(GetProductsByCategory)
  getProductsByCategory(context: StateContext<ProductsStateModel>, action: GetProductsByCategory) {
    return this.apiService.getProductsByCategory(action.category).pipe(
      tap((products) => {
        context.patchState({ products });
      })
    );
  }
}
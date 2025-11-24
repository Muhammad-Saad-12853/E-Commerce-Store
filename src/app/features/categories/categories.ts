import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetCategories, ProductsState } from '../../states/product-state.state';
import { RouterLink } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-categories',
    imports: [RouterLink, AsyncPipe, TitleCasePipe],
    templateUrl: './categories.html',
    styleUrl: './categories.css',
})
export class CategoriesComponent {
    private store = inject(Store);

    categories$ = this.store.select(ProductsState.selectCategories);

    constructor() {
        this.store.dispatch(new GetCategories());
    }
}

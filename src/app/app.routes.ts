import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { ProductDetails } from './features/products/product-details/product-details';
import { Cart } from './features/cart/cart/cart';
import { CategoriesComponent } from './features/categories/categories';
import { Toprated } from './features/products/toprated/toprated';

export const routes: Routes = [
    {
        path: "", component: ProductList
    },
    {
        path: 'product/:id', component: ProductDetails
    },
    {
        path: 'cart', component: Cart
    },
    {
        path: 'categories', component: CategoriesComponent
    },
    {
        path: 'category/:category', component: ProductList
    },
    {
        path: 'toprated', component: Toprated
    },
    { path: '**', redirectTo: "" }
];

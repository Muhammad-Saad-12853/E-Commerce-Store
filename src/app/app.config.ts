import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { ProductsState } from './states/product-state.state';
import { CartState } from './states/cart.state';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      [ProductsState, CartState],
      withNgxsReduxDevtoolsPlugin()
    ),
  ]
};

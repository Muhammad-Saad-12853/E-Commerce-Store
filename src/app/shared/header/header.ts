import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Store } from '@ngxs/store';
import { CartState } from '../../states/cart.state';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private store = inject(Store);
  cartItemCount = this.store.selectSignal(CartState.getItemCount);
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from "./features/products/product-list/product-list";
import { Header } from './shared/header/header';
import { NgxsModule } from '@ngxs/store';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,NgxsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
}

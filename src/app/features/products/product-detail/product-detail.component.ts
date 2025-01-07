import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDetailStateService } from '../shared/data-access/product-detail-state.service';
import { CartStateService } from '../../cart/shared/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [ProductsDetailStateService],
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductsDetailStateService).state;
  cartState = inject(CartStateService).state;

  id = input.required<string>();

  constructor() {
    effect(() => {
      //console.log(this.id());
      this.productDetailState.getById(this.id());
    });
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState.product()!, // El simbolo ! indica (como en C#), que no debe ser nulo.
      quantity: 1,
    })
  }

}

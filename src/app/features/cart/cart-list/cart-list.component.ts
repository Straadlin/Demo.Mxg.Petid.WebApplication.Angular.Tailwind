import { Component, inject } from '@angular/core';
import { CartStateService } from '../shared/cart-state.service';
import CartItemComponent from '../components/cart-item/cart-item.component';
import { ProductItemCart } from '../../../shared/interfaces/product-item-cart.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart-list.component.html',
  styles: ``
})
export default class CartListComponent {

  state = inject(CartStateService).state;

  onRemove(id: number) {
    // console.log(id);
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.update({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    if(product.quantity > 1) {
      this.state.update({
        ...product,
        quantity: product.quantity - 1,
      });
    }
  }

}

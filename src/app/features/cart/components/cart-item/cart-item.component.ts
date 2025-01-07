import { Component, input, output } from '@angular/core';
import { ProductItemCart } from '../../../../shared/interfaces/product-item-cart.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styles: ``
})
export default class CartItemComponent {

  productCartItem = input.required<ProductItemCart>();

  onRemove = output<number>();

  onIncrease = output<ProductItemCart>();

  onDecrease = output<ProductItemCart>();

}

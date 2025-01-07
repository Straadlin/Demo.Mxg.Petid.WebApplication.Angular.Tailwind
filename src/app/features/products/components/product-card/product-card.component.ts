import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, TruncatePipe, TranslateModule],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {

  product = input.required<Product>();

  addToCart = output<Product>();

  add(event: Event) {
    event.stopPropagation();
    event.preventDefault()
    this.addToCart.emit(this.product());
  }

}

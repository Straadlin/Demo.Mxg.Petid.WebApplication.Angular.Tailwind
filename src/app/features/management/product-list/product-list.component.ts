import { Component, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsStateService } from '../shared/products-state.service';
import { Record } from "../../../shared/interfaces/dtos/product/get-products/get-products-dto.interface";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styles: ``
})
export default class ProductListComponent implements OnInit
{
  public products!: Signal<Record[]>;
  public pageIndex!: Signal<number>;
  public pageSize!: Signal<number>;
  public totalCount!: Signal<number>;
  public totalPages!: Signal<number[]>;

  public Math = Math;

  constructor(private productsStateService: ProductsStateService) {}

  public ngOnInit(): void
  {
    this.products = this.productsStateService.products;
    this.pageIndex = this.productsStateService.pageIndex;
    this.pageSize = this.productsStateService.pageSize;
    this.totalCount = this.productsStateService.totalCount;

    this.totalPages = computed(() =>
    {
      const total = Math.ceil(this.totalCount() / this.pageSize());
      return Array.from({ length: total }, (_, i) => i + 1);
    });

    this.productsStateService.loadProducts();
  }

  public onPageChange(newPage: number): void
  {
    if (newPage > 0 && newPage <= this.totalPages().length)
    {
      this.productsStateService.updatePageIndex(newPage);
      this.productsStateService.loadProducts(newPage);
    }
  }
}

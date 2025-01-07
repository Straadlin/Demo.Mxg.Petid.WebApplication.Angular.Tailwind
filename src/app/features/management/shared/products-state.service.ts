import { Injectable, signal, inject } from "@angular/core";
import { ProductsService } from "./products.service";
import { Record } from "../../../shared/interfaces/dtos/product/get-products/get-products-dto.interface";

@Injectable({ providedIn: 'root' })
export class ProductsStateService
{
  public products = signal<Record[]>([]);
  public pageIndex = signal<number>(1);
  public pageSize = signal<number>(10);
  public totalCount = signal<number>(0);
  private productsService = inject(ProductsService);

  constructor() {}

  public loadProducts(pageIndex: number = 1, pageSize: number = 3): void
  {
    this.productsService
      .getProducts(pageIndex, pageSize)
      .subscribe(response =>
      {
        if (response.isSuccess)
        {
          this.products.set(response.data.records);
          this.pageIndex.set(response.data.pageIndex);
          this.pageSize.set(response.data.pageSize);
          this.totalCount.set(response.data.count);
        }
      });
  }

  public updatePageIndex(newPageIndex: number): void
  {
    this.pageIndex.set(newPageIndex);
  }

  public updatePageSize(newPageSize: number): void
  {
    this.pageSize.set(newPageSize);
  }
}

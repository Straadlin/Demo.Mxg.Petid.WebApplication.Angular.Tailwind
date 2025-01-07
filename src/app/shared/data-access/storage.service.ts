import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductItemCart } from "../interfaces/product-item-cart.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  loadProducts(): Observable<ProductItemCart[]>{
    const rawProducts = localStorage.getItem('products');
    const products = rawProducts ? JSON.parse(rawProducts) : [];
    return of(products);
  }

  saveProducts(products: ProductItemCart[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  //

  getData(key: string): string | null{
    const rawProducts = localStorage.getItem(key);
    return rawProducts;
  }

  saveData(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

}

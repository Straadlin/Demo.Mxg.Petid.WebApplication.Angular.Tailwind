import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpService } from "../../../shared/data-access/base-http.service";
import { GetProductsDto } from "../../../shared/interfaces/dtos/product/get-products/get-products-dto.interface";

@Injectable({providedIn: 'root'})
export class ProductsService extends BaseHttpService {

  getProducts(pageIndex: number, pageSize: number): Observable<GetProductsDto> {
    const url = `${this.apiUrl}/products/get-products?pageindex=${pageIndex}&pagesize=${pageSize}`;
    return this.http.get<GetProductsDto>(url);
  }
}

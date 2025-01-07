import { Injectable } from "@angular/core";
import { Observable, of, timeout } from "rxjs";
import { BaseHttpService } from "../../../../shared/data-access/base-http.service";
import { Product } from "../../../../shared/interfaces/product.interface";

const LIMIT = 5;

@Injectable({providedIn: 'root'})
export class ProductsService extends BaseHttpService {

    getProducts(page: number): Observable<Product[]> {
    const products = [
      {
        id: 1,
        name: 'Llavero Digital',
        description: "Llavero digital que puede ser usado para identificar a tu mascota a través de internet, usanod el código QR. Además permite guardar y consultar información de su cartilla de vacunación.",
        price: 250.00,
        url: 'https://www.dropbox.com/scl/fi/tl1xonrw563887k8qajs9/0ceffdbc65454b2eab052fa96196fe80.jpg?rlkey=hprtoy3ovw21nwvhodgclo8pz&st=i8trki8z&raw=1',
        createdDatetime: new Date('2024-11-29'),
      },
    ];

    return of(products);
  }

  getProducts2(page: number): Observable<Product[]> {
    const url: string = `${this.apiUrl}/products`;
    return this.http
      .get<any>(url, {
        params: {
          limit: page * LIMIT
        }})
      .pipe(timeout(this.timeout));
  }

  getProduct(id: string): Observable<Product> {

    const product =
      {
        id: 1,
        name: 'Llavero Digital',
        description: "Llavero digital que puede ser usado para identificar a tu mascota a través de internet, usanod el código QR. Además permite guardar y consultar información de su cartilla de vacunación.",
        price: 250.00,
        url: 'https://www.dropbox.com/scl/fi/tl1xonrw563887k8qajs9/0ceffdbc65454b2eab052fa96196fe80.jpg?rlkey=hprtoy3ovw21nwvhodgclo8pz&st=i8trki8z&raw=1',
        createdDatetime: new Date('2016-05-03'),
      };

      // Simulando una respuesta HTTP como observable
      return of(product);
  }

  getProduct2(id: string): Observable<Product> {
    const url: string = `${this.apiUrl}/products/${id}`;
    return this.http
      .get<Product>(url, {})
      .pipe(timeout(this.timeout));
  }
}

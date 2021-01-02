import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  configUrl = '/api/product';

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(this.configUrl);
  }

  getProductById(id) {
    return this.http.get(this.configUrl + '/' + id);
  }

}

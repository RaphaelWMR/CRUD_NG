import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Product } from '../interfaces/product'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint; //localhost 3000
    this.myApiUrl = 'api/productos/'
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

}

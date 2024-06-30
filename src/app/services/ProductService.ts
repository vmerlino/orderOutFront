import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { Observable } from 'rxjs';
import { BACKEND_URL } from 'src/constants';

@Injectable({providedIn: 'root'})
export class ProductService {
  
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  
  productNames: string[] = [
    "Bamboo Watch", 
    "Black Watch", 
    "Blue Band", 
    "Blue T-Shirt", 
    
  ];
  
  
  constructor(private http: HttpClient) { }
  
  private jsonHeaders = new HttpHeaders({
    'Accept': 'text/plain'
  });

  deleteProduct(id: number | null): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/Product/${id}`, { headers: this.jsonHeaders });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${BACKEND_URL}/Product/GetProduct/${id}`, { headers: this.jsonHeaders });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BACKEND_URL}/Product/AllProducts`, { headers: this.jsonHeaders });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${BACKEND_URL}/Product`, product, { headers: this.jsonHeaders });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${BACKEND_URL}/Product/${id}`, product, { headers: this.jsonHeaders });
  }
}

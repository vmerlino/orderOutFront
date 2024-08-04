import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { Observable } from 'rxjs';
import { BACKEND_URL } from 'src/constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class ProductService {
  
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  
  productNames: string[] = [
    "Bamboo Watch", 
    "Black Watch", 
    "Blue Band", 
    "Blue T-Shirt", 
    
  ];
  
  
  constructor(    private sanitizer: DomSanitizer,  private http: HttpClient) { }
  
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

  getPhotoProduct(id:number): Observable<Blob>{
    return this.http.get<Blob>(`${BACKEND_URL}/Product/GetProductPhoto?productId=${id}`,  { responseType: 'blob' as 'json' })
  }

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(`${BACKEND_URL}/Product/CreateProductWhithPhoto`, product);
  }
  getProductWhithPhoto(nameImage: String): Observable<void>{
    return this.http.get<void>(`${BACKEND_URL}/Product/CreateProductWhithPhoto/`+nameImage);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${BACKEND_URL}/Product/${id}`, product, { headers: this.jsonHeaders });
  }

getImage(id: number): Promise<SafeResourceUrl> {
    return new Promise((resolve, reject) => {
      this.getPhotoProduct(id).subscribe(product => {
        if (product) {
          const reader = new FileReader();
          reader.readAsDataURL(product);  
          reader.onloadend = () => {
            resolve(this.sanitizer.bypassSecurityTrustUrl(reader.result as string));
          };
        } else {
          console.error('No se ha recibido una imagen válida');
          resolve(this.sanitizer.bypassSecurityTrustUrl(''));
        }
      }, error => {
        console.error('Error al obtener la imagen:', error);
        reject(error);  
      });
    });
  }
}

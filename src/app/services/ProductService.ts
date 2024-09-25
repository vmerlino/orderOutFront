import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  updateProduct(product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('Id', product.id.toString());
    formData.append('Name', product.name);
    formData.append('Description', product.description);
    formData.append('Price', product.price.toString());
    formData.append('CategoryId', product!.category!.id!.toString());
    formData.append('IsVegan', product.isVegan.toString());
    formData.append('IsGlutenFree', product.isGlutenFree.toString());
    formData.append('Making', product.making.toString());
    formData.append('Hidden', product.hidden.toString());

    return this.http.put<Product>(`${BACKEND_URL}/Product/UpdateProduct`, formData, {
        headers: {
            // No establecemos 'Content-Type' explícitamente, ya que Angular lo manejará por nosotros.
            'accept': 'text/plain'
        }
    });
}

    updateProductMassive(percentage: number | null, categoryId: number | null): Observable<void> {
      let params = new HttpParams().set('percentage', percentage!.toString());

      if (categoryId) {
          params = params.set('category', categoryId.toString());
      }
      return this.http.put<void>(`${BACKEND_URL}/Product/MassiveProductUpdate`, null, { headers: this.jsonHeaders, params });
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

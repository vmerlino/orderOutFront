import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }
  
  deleteCategory(id: number | null):  Observable<void> {
    let params = new HttpParams().set('id', (id ?? 0).toString());
    console.log(params)
    return this.http.delete<void>(`${BACKEND_URL}/Category/DeleteCategory`, {params});

  }
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${BACKEND_URL}/GetCategory/${id}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BACKEND_URL+'/Category/AllCategories');
  }

  createCategory(category: Category): Observable<Category> {
    if(category.id != 0){
      return this.http.put<Category>(`${BACKEND_URL}/Category/UpdateCategory`, category);
    }else{
      return this.http.post<Category>(BACKEND_URL+'/Category/CreateCategory', category);
    }
  }


}

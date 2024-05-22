import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }
  
  deleteCategory(id: number):  Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/${id}`);

  }
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${BACKEND_URL}/${id}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BACKEND_URL);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(BACKEND_URL, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${BACKEND_URL}/${id}`, category);
  }

}

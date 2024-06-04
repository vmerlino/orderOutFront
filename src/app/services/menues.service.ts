import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Menu } from '../model/Menu';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class MenuesService {
  
  constructor(private http: HttpClient) { }
  
  deleteMenu(id: any): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/${id}`);
  }
  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${BACKEND_URL}/${id}`);
  }

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(BACKEND_URL);
  }

  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(BACKEND_URL, menu);
  }

  updateMenu(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${BACKEND_URL}/${id}`, menu);
  }

}

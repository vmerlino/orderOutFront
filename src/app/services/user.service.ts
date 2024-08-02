import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }
  
  login(user: User): Observable<any> {
  return this.http.post<any>(`${BACKEND_URL}/User/Login`, user);
  }
}

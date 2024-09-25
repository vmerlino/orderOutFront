import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }
  
  login(user: User): Observable<any> {
  return this.http.post<any>(`${BACKEND_URL}/User/Login`, user).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred:', error); 
      return throwError(() => error);

    })
  );
  }
}

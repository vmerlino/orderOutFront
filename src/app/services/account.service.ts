import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';
import { Account } from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  
  constructor(private http: HttpClient) { }
  
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/${id}`);
  }
  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${BACKEND_URL}/${id}`);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${BACKEND_URL}/Account/AllAccounts`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(BACKEND_URL, account);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${BACKEND_URL}/${id}`, account);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';
import { Account } from '../model/Account';
import { BillIndicationDTO } from '../model/Dtos/BillIndicationDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  
  constructor(private http: HttpClient) { }
  
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/${id}`);
  }
  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${BACKEND_URL}/Bill/GetBillBy Id/${id}`);
  }

  getAllAccounts(startDate : Date, endDate : Date): Observable<any> {
    const formattedStartDate = startDate.toISOString().split('T')[0]; // Formato 'yyyy-MM-dd'
    const formattedEndDate = endDate.toISOString().split('T')[0];     // Formato 'yyyy-MM-dd'
  
    // Construye la URL con las fechas codificadas
    const url = `${BACKEND_URL}/Bill/GetBills?startDate=${encodeURIComponent(formattedStartDate)}&endDate=${encodeURIComponent(formattedEndDate)}`;
    return this.http.get<any>(url);
  
  }
  getStatistics(): Observable<any>{
    return this.http.get<Account>(`${BACKEND_URL}/Bill/GetStatistics`)
  }
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(BACKEND_URL, account);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${BACKEND_URL}/${id}`, account);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';
import { Account } from '../model/Account';
import { BillIndicationDTO } from '../model/Dtos/BillIndicationDTO';
import { FormaPagoEnum } from '../model/FormaPagoEnum';

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
  getStatistics(startDate : String, endDate : String): Observable<any>{
    if(startDate !=null && endDate != null){
      return this.http.get<Account>(`${BACKEND_URL}/Bill/GetStatistics?startDate=${encodeURIComponent(startDate.toString())}&endDate=${encodeURIComponent(endDate.toString())}`)
    }else{
      return this.http.get<Account>(`${BACKEND_URL}/Bill/GetStatistics`)

    }
  }
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(BACKEND_URL, account);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${BACKEND_URL}/${id}`, account);
  }

  updatePaymentType(id: number, wayToPay: number): Observable<Account> {
    let params = new HttpParams()
    .set('billId', id.toString())  // Asegúrate de convertir los números a string
    .set('isPaid', 'true')         // También convertir booleanos a string
    .set('wayToPay', wayToPay.toString());

  return this.http.put<Account>(`${BACKEND_URL}/Bill/UpdateBillPaid`, null, { params });
}
}

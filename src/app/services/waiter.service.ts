import { Injectable } from '@angular/core';
import { Waiter } from '../model/Waiter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {
  
  
  constructor(private http: HttpClient) { }
  
  deleteWaiter(id: number | null): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/${id}`);
  }
  getWaiter(id: number): Observable<Waiter> {
    return this.http.get<Waiter>(`${BACKEND_URL}/${id}`);
  }

  getAllWaiters(): Observable<Waiter[]> {
    return this.http.get<Waiter[]>(BACKEND_URL+"/Waiter/AllWaiters");
  }

  createWaiter(waiter: Waiter): Observable<Waiter> {
    return this.http.post<Waiter>(BACKEND_URL, waiter);
  }

  updateWaiter(id: number, waiter: Waiter): Observable<Waiter> {
    return this.http.put<Waiter>(`${BACKEND_URL}/${id}`, waiter);
  }
}

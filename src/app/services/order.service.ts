import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { Observable } from 'rxjs';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.delete<Order[]>(`${BACKEND_URL}/orders`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${BACKEND_URL}/orders/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${BACKEND_URL}/orders`, order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${BACKEND_URL}/orders/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/orders/${id}`);
  }
}

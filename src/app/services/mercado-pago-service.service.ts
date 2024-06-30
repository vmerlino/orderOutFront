import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoServiceService {

  constructor(private http: HttpClient) { }


realizarPagoMercadoPago(id: number){
  return this.http.post<string>(`${BACKEND_URL}/Payment/create-order/${id}`,null,{ responseType: 'text' as 'json' });
}
}

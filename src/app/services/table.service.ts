import { Injectable } from '@angular/core';
import { Table } from '../model/Table';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  
  constructor(private http: HttpClient) { }
  private jsonHeaders = new HttpHeaders({
    'Accept': 'text/plain'
  });
  getTableId(mesaId: number) {
    const params = new HttpParams().set('tableId', mesaId.toString());
    return this.http.get<Table>(`${BACKEND_URL}/Table/GetTable`, { params, headers: this.jsonHeaders });
    }
}

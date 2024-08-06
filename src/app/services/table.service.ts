import { Injectable } from '@angular/core';
import { Table } from '../model/Table';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BACKEND_URL } from 'src/constants';
import { Observable } from 'rxjs';
import { TableWaiter } from '../model/TableWaiter';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}
  private jsonHeaders = new HttpHeaders({
    Accept: 'text/plain',
  });
  createTable(table: Table): Observable<void> {
    return this.http.post<void>(`${BACKEND_URL}/Table/CreateTable`, table);
  }
  deleteTable(id: number | null): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}/Table/${id}`, { headers: this.jsonHeaders });
  }

  updateTable(table: Table): Observable<Table> {
    return this.http.put<Table>(`${BACKEND_URL}/Table/UpdateTable`, table);
  }
  getTableId(mesaId: number) {
    const params = new HttpParams().set('tableId', mesaId.toString());
    return this.http.get<Table>(`${BACKEND_URL}/Table/GetTable`, {
      params,
      headers: this.jsonHeaders,
    });
  }

  getAllTable(): Observable<Table[]> {
    return this.http.get<Table[]>(`${BACKEND_URL}/Table/AllTables`, {
      headers: this.jsonHeaders,
    });
  }

  getAllTableWaiter(): Observable<TableWaiter[]> {
    return this.http.get<TableWaiter[]>(`${BACKEND_URL}/TableWaiter/AllTablesWaiters`, {
      headers: this.jsonHeaders,
    });
  }
}

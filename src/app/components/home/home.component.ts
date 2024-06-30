import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Table } from 'src/app/model/Table';
import { TableService } from 'src/app/services/table.service';
import { setUser } from 'src/app/states/Auth.actions';
import { UserState } from 'src/app/states/Auth.reducer';
import { setTable } from 'src/app/states/TableState.actions';
import { TableState } from 'src/app/states/TableState.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  table$: Observable<Table | null>;
  usuario: string;

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private store: Store<{ table: TableState, auth: UserState }>,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const mesaId = params['id'];
      this.getTableId(mesaId);
    });
  }

  async getTableId(mesaId: number) {
    try {
      const table = await firstValueFrom(this.tableService.getTableId(mesaId));
      this.store.dispatch(setTable({ table }));
    } catch (error) {
      console.error('Error fetching table:', error);
    }
  }

  setUser(){
    this.store.dispatch(setUser({ user: this.usuario }))
    console.log(this.usuario)
  }
}

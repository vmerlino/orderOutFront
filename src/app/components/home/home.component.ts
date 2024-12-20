import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Table } from 'src/app/model/Table';
import { TableService } from 'src/app/services/table.service';
import { setUser } from 'src/app/states/Auth.actions';
import { UserState } from 'src/app/states/Auth.reducer';
import { setTable } from 'src/app/states/TableState.actions';
import { selectTableState, TableState } from 'src/app/states/TableState.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  table$: Observable<Table | null>;
  usuario: string;
  mesaId: any;
  idTable: any;

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ table: TableState; auth: UserState }>
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.mesaId = params['id'];
          this.getTableId(this.mesaId);
          this.router.navigate(['/home'], { state: { idTable: params['id'] } });
        } else {
          const navigation = this.router.getCurrentNavigation();
          if (navigation?.extras.state) {
            this.idTable = navigation.extras.state['idTable'];
            this.mesaId = this.idTable;
          } else {
            this.store.select(selectTableState) .subscribe(value =>{
              this.mesaId = value.table?.id
            })
                }
        }
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

  setUser() {
    this.store.dispatch(setUser({ user: this.usuario }));
  }
}

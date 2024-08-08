import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ShiftEnum } from 'src/app/model/ShiftEnum';
import { Table } from 'src/app/model/Table';
import { TableWaiter } from 'src/app/model/TableWaiter';
import { Waiter } from 'src/app/model/Waiter';
import { TableService } from 'src/app/services/table.service';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-mesas-admin',
  templateUrl: './mesas-admin.component.html',
  styleUrls: ['./mesas-admin.component.scss']
})
export class MesasAdminComponent implements OnInit {
  selectedTable: Table | null = null;
  tables: Table[] = [];
  displayDialog: boolean = false;
  mozos: Waiter[];
  mozosPorTurno: { [key: number]: Waiter[] } = {}; // Agrupa mozos por turno
  selectedWaiters: { [key: number]: Waiter | null } = {
    [ShiftEnum.Manana]: null,
    [ShiftEnum.Tarde]: null,
    [ShiftEnum.Noche]: null
  };
  tableWaiters: TableWaiter[] = [];
  waiters: Waiter[] = []; // Lista de mozos obtenida de tableWaiter

  constructor(private tableService: TableService,private waiterService: WaiterService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getTables();
    this.getTableWaiter();
    this.getWaiters();
  }
  getWaiters(){
    this.waiterService.getAllWaiters().subscribe(value => this.mozos = value);
  }

  addTable(table: Table) {
    this.tableService.createTable(table).subscribe(
      newTable => {
       // this.tables.push(newTable);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Table added successfully' });
      },
      error => {
        console.error('Error adding table: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding table' });
      }
    );
  }

  updateTable(table: Table) {
    this.tableService.updateTable(table).subscribe(
      updatedTable => {
        const index = this.tables.findIndex((a: Table) => a.id === updatedTable.id);
        if (index !== -1) {
          this.tables[index] = updatedTable;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Table updated successfully' });
      },
      error => {
        console.error('Error updating table: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating table' });
      }
    );
  }

  deleteTable(table: Table) {
    if (confirm('Are you sure you want to delete this table?')) {
      this.tableService.deleteTable(table.id).subscribe(
        () => {
          this.tables = this.tables.filter((a: Table) => a.id !== table.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Table deleted successfully' });
        },
        error => {
          console.error('Error deleting table: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting table' });
        }
      );
    }
  }

  selectTable(table: Table | null) {
    this.selectedTable = table;
    this.messageService.add({ severity: 'info', summary: 'Table Selected', detail: table?.id?.toString() });
  }

  getTables() {
    this.tableService.getAllTable().subscribe(tables => {
      this.tables = tables;
      console.log(tables);
    });
  }

  getTableWaiter() {
    this.tableService.getAllTableWaiter().subscribe(tablesWaiters => {
      this.tableWaiters = tablesWaiters;
      if (this.selectedTable) {
        this.updateMozoData(this.selectedTable.id);
      }
    });
  }

  updateMozoData(idTable: number | null) {
    // Inicializa el objeto para agrupar mozos por turno
    this.mozosPorTurno = {
      [ShiftEnum.Manana]: [],
      [ShiftEnum.Tarde]: [],
      [ShiftEnum.Noche]: []
    };

    const tableWaitersForTable = this.tableWaiters.filter(tw => tw.tableId === idTable);
    tableWaitersForTable.forEach(tw => {
      const waiter = tw.waiter; 
      if (waiter) {
        this.mozosPorTurno[tw.shift].push(waiter);
      }
    });
    console.log(this.mozosPorTurno)
  }

  showDialog(table: Table) {
    this.selectedTable = table;
    this.updateMozoData(table.id);
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedTable = null;
  }
  getStatusName(id: any): String {
    return ShiftEnum.getShiftName(id);
  }
  updateTableWaiterSelect(){
    
  }
}

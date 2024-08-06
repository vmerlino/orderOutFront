import { ShiftEnum } from "./ShiftEnum";
import { Table } from "./Table";
import { Waiter } from "./Waiter";


export class TableWaiter {
  tableId: number;
  waiterId: number;
  date: Date;
  shift: ShiftEnum;
  table: Table; 
  waiter: Waiter; 

  constructor(
    tableId: number,
    waiterId: number,
    date: Date,
    shift: ShiftEnum,
    table: Table,
    waiter: Waiter
  ) {
    this.tableId = tableId;
    this.waiterId = waiterId;
    this.date = date;
    this.shift = shift;
    this.table = table;
    this.waiter = waiter;
  }
}

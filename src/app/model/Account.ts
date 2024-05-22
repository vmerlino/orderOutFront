import { Order } from "./Order";

export class Account {
    id: number;
    tableNumber: number;
    totalAmount: number;
    orders: Order[];
  
    constructor(id: number, tableNumber: number, totalAmount: number, orders: Order[]) {
      this.id = id;
      this.tableNumber = tableNumber;
      this.totalAmount = totalAmount;
      this.orders = orders;
    }
  }
  
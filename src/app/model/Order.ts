

import { Table } from "./Table";
import { OrderProduct } from "./orderProduct";

export class Order {
    id: number;
    products: OrderProduct[];
    table: Table;
    totalAmount: number;
    date: Date;
    status: String;
  
    constructor(id: number, products: OrderProduct[], table: Table, totalAmount: number, date: Date, status: String) {
      this.id = id;
      this.products = products;
      this.table = table;
      this.totalAmount = totalAmount;
      this.date = date;
      this.status = status;
    }
  }
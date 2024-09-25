

import { Account } from "./Account";
import { OrderStatusEnum } from "./OrderStatusEnum";
import { Table } from "./Table";
import { OrderProduct } from "./orderProduct";

export class Order {
    id: number;
    products: OrderProduct[];
    table: Table;
    totalAmount: number;
    date: Date;
    status: OrderStatusEnum;
    bill: Account;
    billId: number;
    requested: Date;

  
    constructor(id: number, requested: Date, products: OrderProduct[], table: Table, totalAmount: number, date: Date, status: OrderStatusEnum) {
      this.id = id;
      this.products = products;
      this.table = table;
      this.requested = requested;
      this.totalAmount = totalAmount;
      this.date = date;
      this.status = status;
    }
  }
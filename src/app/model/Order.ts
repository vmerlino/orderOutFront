import { Product } from "./Product";
import { Waiter } from "./Waiter";

export class Order {
    id: number;
    products: Product[];
    waiter: Waiter;
    totalAmount: number;
    date: Date;
  
    constructor(id: number, products: Product[], waiter: Waiter, totalAmount: number, date: Date) {
      this.id = id;
      this.products = products;
      this.waiter = waiter;
      this.totalAmount = totalAmount;
      this.date = date;
    }
  }
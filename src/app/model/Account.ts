import { FormaPagoEnum } from "./FormaPagoEnum";
import { TableWaiter } from "./TableWaiter";

export class Account {
  id:number;
    amount?: number; 
    tip?: number;
    date: Date; 
    wayToPay: number | null;
    clientEmail: string; 
  isPaid: boolean;
  tableWaiter: TableWaiter;

    constructor(
        amount: number | undefined,
        tip: number | undefined,
        date: Date,
        wayToPay: number,
        clientEmail: string
      ) {
        this.amount = amount;
        this.tip = tip;
        this.date = date;
        this.wayToPay = wayToPay;
        this.clientEmail = clientEmail;
      }
}
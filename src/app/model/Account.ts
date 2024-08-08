import { FormaPagoEnum } from "./FormaPagoEnum";

export class Account {
  id:number;
    amount?: number; 
    tip?: number;
    date: Date; 
    wayToPay: FormaPagoEnum;
    clientEmail: string; 

    constructor(
        amount: number | undefined,
        tip: number | undefined,
        date: Date,
        wayToPay: FormaPagoEnum,
        clientEmail: string
      ) {
        this.amount = amount;
        this.tip = tip;
        this.date = date;
        this.wayToPay = wayToPay;
        this.clientEmail = clientEmail;
      }
}
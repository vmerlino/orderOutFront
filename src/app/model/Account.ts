import { FormaPagoEnum } from "./FormaPagoEnum";
import { Order } from "./Order";

export class Account {
    id: number;
    amount: number;
    date: Date;
    formaPago: FormaPagoEnum;
    orders: Order[]
    mailClient: String; 

    constructor(id: number, amount: number, date: Date, formaPago: FormaPagoEnum) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.formaPago = formaPago;
    }

}
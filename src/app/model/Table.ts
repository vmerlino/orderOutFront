import { Waiter } from "./Waiter";

export class Table {
    id: number | null;
    amountPeople: number;
    waiter: Waiter;
    state: String;
    constructor(id: number |null, amountPeople: number, waiter: Waiter, state: String){
        this.id = id;
        this.amountPeople = amountPeople;
        this.waiter = waiter;
        this.state = state;
    }
}
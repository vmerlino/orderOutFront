import { Product } from "./Product";

export class OrderProduct  {
    product: Product;
    quantity: number;
    clarification: String;
  
    constructor(product: Product, quantity: number, clarification: String) {
      this.product = product;
      this.quantity = quantity;
      this.clarification = clarification;
    }
  }
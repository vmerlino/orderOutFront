

export class OrderProductDto {
    productId: number;
    quantity: number;
    clarification?: String;

    constructor(productId: number, quantity: number, clarification?: String) {
        this.productId = productId;
        this.quantity = quantity;
        this.clarification = clarification;
      }
  }
  
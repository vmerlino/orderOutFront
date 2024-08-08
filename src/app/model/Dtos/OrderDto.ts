import { OrderStatusEnum } from "../OrderStatusEnum";
import { OrderProductDto } from "./OrderProductDto";

export class OrderDto {
  tableId: number | null;
  dateTime: Date;
  status: OrderStatusEnum;
  userId?: number;
  totalAmount: number;
  ordersProducts: OrderProductDto[];
  billId?:number | null;
  constructor(tableId: number | null, totalAmount: number, dateTime: Date, status: OrderStatusEnum, userId?: number, ordersProducts: OrderProductDto[] = [], billId?: number) {
    this.tableId = tableId;
    this.dateTime = dateTime;
    this.status = status;
    this.totalAmount = totalAmount;
    this.userId = userId;
    this.ordersProducts = ordersProducts;
    this.billId = billId;
  }
}

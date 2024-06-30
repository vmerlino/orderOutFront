import { OrderStatusEnum } from "../OrderStatusEnum";
import { OrderProductDto } from "./OrderProductDto";

export class OrderDto {
  tableId: number | null;
  dateTime: Date;
  status: OrderStatusEnum;
  userId?: number;
  ordersProducts: OrderProductDto[];
  constructor(tableId: number | null, dateTime: Date, status: OrderStatusEnum, userId?: number, ordersProducts: OrderProductDto[] = []) {
    this.tableId = tableId;
    this.dateTime = dateTime;
    this.status = status;
    this.userId = userId;
    this.ordersProducts = ordersProducts;
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.scss']
})
export class PedidosAdminComponent implements OnInit {

 orders: Order[];
  selectedOrder: Order;

  constructor(private orderService: OrderService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.error('Error loading orders: ', error);
      }
    );
  }

  addOrder(order: Order) {
    this.orderService.createOrder(order).subscribe(
      newOrder => {
        this.orders.push(newOrder);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order added successfully' });
      },
      error => {
        console.error('Error adding order: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding order' });
      }
    );
  }

  updateOrder(order: Order) {
    this.orderService.updateOrder(order.id, order).subscribe(
      updatedOrder => {
        const index = this.orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order updated successfully' });
      },
      error => {
        console.error('Error updating order: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating order' });
      }
    );
  }

  deleteOrder(order: Order) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(order.id).subscribe(
        () => {
          this.orders = this.orders.filter(o => o.id !== order.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order deleted successfully' });
        },
        error => {
          console.error('Error deleting order: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting order' });
        }
      );
    }
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.messageService.add({ severity: 'info', summary: 'Order Selected', detail: order.id.toString() });
  }

  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Order Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Order Unselected', detail: event.data.name });
  }

  isRowSelectable(event: any) {
    return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data: any) {
    return data.inventoryStatus === 'OUTOFSTOCK';
  }


}

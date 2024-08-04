import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/model/Order';
import { OrderProduct } from 'src/app/model/orderProduct';
import { OrderStatusEnum } from 'src/app/model/OrderStatusEnum';
import { OrderService } from 'src/app/services/order.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { NotificationsState } from 'src/app/states/Notifications.reducer';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.scss'],
})
export class PedidosAdminComponent implements OnInit {
  visibleBadges: Set<{ tableId: number; payTable: any }> = new Set();
  todasOrdenes: Order[];
  orders: Order[];
  selectedOrder: Order;
  sortOptions: SelectItem[];

  sortOrder: number;
  sortKey: string;
  sortField: string;
  waiterRequests: any[] = [];
  websocketSubscription: Subscription;
  statuses = [
    { label: 'Nuevo', value: OrderStatusEnum.Nuevo },
    { label: 'Confirmado', value: OrderStatusEnum.Confirmado },
    { label: 'Preparando', value: OrderStatusEnum.Preparando },
    { label: 'Entregado', value: OrderStatusEnum.Entregado },
    { label: 'Pagado', value: OrderStatusEnum.Pagado }
  ];
  constructor(
    private websocketService: WebSocketService,
    private orderService: OrderService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
    this.primengConfig.ripple = true;
    this.loadOrders();
    this.websocketSubscription = this.websocketService.messages$.subscribe(
      (message) => {
        if (message.payTable) {
          this.visibleBadges.add({
            tableId: message.tableNumber,
            payTable: message.payTable,
          });
        } else {
          this.visibleBadges.add({
            tableId: message.tableNumber,
            payTable: null,
          });
        }
      }
    );
  }
  onStatusChange(order: Order, event: any){
    order.status = event.value;
    this.updateOrder(order);
  }

  isPayTableNull(tableId: number): boolean {
    const entry = Array.from(this.visibleBadges).find(
      (data) => data.tableId === tableId
    );
    return entry ? entry.payTable === null : false;
  }

  getPayTable(tableId: number): any | null {
    const entry = Array.from(this.visibleBadges).find(
      (data) => data.tableId === tableId
    );
    return entry ? entry.payTable : null;
  }
  ngOnDestroy() {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }
  loadOrders() {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.todasOrdenes =orders;
      console.log(orders);
    });
  }
  getOrderDescriptions(order: any): string | null {
    if (order.products != null) {
      return order.products
        .map((product: OrderProduct) => product.product.name)
        .join(', ');
    } else {
      return null;
    }
  }
  addOrder(order: Order) {
    /* this.orderService.createOrder(order).subscribe(
      newOrder => {
        this.orders.push(newOrder);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order added successfully' });
        },
      error => {
        console.error('Error adding order: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding order' });
        }
        );*/
  }
  getTotalAmount(order: Order): number {
    let total = 0;
    order.products.forEach((product) => {
      console.log(product)
      total = total + product.product.price;
      console.log(total);
    });
    return total;
  }
  updateOrder(order: Order) {
    this.orderService.updateOrder(order).subscribe(
      (updatedOrder) => {
        const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order updated successfully',
        });
      },
      (error) => {
        console.error('Error updating order: ', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating order',
        });
      }
    );
  }

  deleteOrder(order: Order) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(order.id).subscribe(
        () => {
          this.orders = this.orders.filter((o) => o.id !== order.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order deleted successfully',
          });
        },
        (error) => {
          console.error('Error deleting order: ', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting order',
          });
        }
      );
    }
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.messageService.add({
      severity: 'info',
      summary: 'Order Selected',
      detail: order.id.toString(),
    });
  }

  onRowSelect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Order Selected',
      detail: event.data.name,
    });
  }

  onRowUnselect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Order Unselected',
      detail: event.data.name,
    });
  }

  isRowSelectable(event: any) {
    return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data: any) {
    return data.inventoryStatus === 'OUTOFSTOCK';
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value != 'todos') {
      this.orders = this.todasOrdenes.filter(order => order.status === value);
    } else {
      this.orders = this.todasOrdenes; // Muestra todas las órdenes si no hay filtro
    }
  
  }
  getStatusName(id: any): String {
    return OrderStatusEnum.getStatusName(id);
  }
}

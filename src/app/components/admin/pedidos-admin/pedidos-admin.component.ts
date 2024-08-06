import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { FormaPagoEnum } from 'src/app/model/FormaPagoEnum';
import { Order } from 'src/app/model/Order';
import { OrderProduct } from 'src/app/model/orderProduct';
import { OrderStatusEnum } from 'src/app/model/OrderStatusEnum';
import { Role } from 'src/app/model/Role';
import { OrderService } from 'src/app/services/order.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { selectUserState } from 'src/app/states/Auth.reducer';
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
  statuses : any[];

  displayDialog: boolean = false;
  selectedPaymentMethod: any;
  orderPay: Order | null;
  paymentMethods: any[] = [
    { label: 'Efectivo', value: FormaPagoEnum.Efectivo },
    { label: 'Tarjeta de crédito', value: FormaPagoEnum.TarjetaCredito },
    { label: 'Tajeta de Debito', value: FormaPagoEnum.TarjetaDebito },
    { label: 'Mercado Pago', value: FormaPagoEnum.MercadoPago }
  ];
  constructor(
    private websocketService: WebSocketService,
    private orderService: OrderService,
    private messageService: MessageService,
    private store: Store
  ) {}
  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  confirmSelection() {
    if(this.selectedPaymentMethod){
      this.onStatusChange(this.orderPay,{value:5});
      //mandar objeto bill con forma d pago nueva
      this.hideDialog();
      this.orderPay=null;

    }
  }
  ngOnInit() {
    this.store.select(selectUserState).subscribe(user => {
      let userrolesid = user.user?.usersRoles.map(item =>  item.name);
      if (userrolesid?.includes("SUPERADMIN") || userrolesid?.includes("ADMIN")) {
        this.statuses = [
          { label: 'Nuevo', value: OrderStatusEnum.Nuevo },
          { label: 'Confirmado', value: OrderStatusEnum.Confirmado },
          { label: 'Preparando', value: OrderStatusEnum.Preparando },
          { label: 'Entregado', value: OrderStatusEnum.Entregado },
          { label: 'Pagado', value: OrderStatusEnum.Pagado },
          { label: 'Cancelado', value: OrderStatusEnum.Cancelado }
        ];
        this.loadOrders(false);
      }else if (userrolesid?.includes("COCINA")){

        this.statuses = [
          { label: 'Confirmado', value: OrderStatusEnum.Confirmado },
          { label: 'Preparando', value: OrderStatusEnum.Preparando },
          { label: 'Entregado', value: OrderStatusEnum.Entregado },
          { label: 'Cancelado', value: OrderStatusEnum.Cancelado }
        ];
        this.loadOrders(true);
      }
    })
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
  onStatusChange(order: Order |null, event: any){
    if(event.value==5 && this.selectedPaymentMethod==null){
      this.orderPay =order;
      this.showDialog();
    }else{
    order!.status = event.value;
    this.updateOrder(order!);
    this.selectedPaymentMethod=null;
    }
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
  loadOrders(cocina: boolean) {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      if (cocina){
        this.orders = orders.filter(item =>[2,3,4,6].includes(item.status));
        this.todasOrdenes = orders.filter(item =>[2,3,4,6].includes(item.status));
      }else{
      this.orders = orders;
      this.todasOrdenes =orders;
      }
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
  
  getTotalAmount(order: Order): number {
    let total = 0;
    order.products.forEach((product) => {
      total = total + product.product.price;
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

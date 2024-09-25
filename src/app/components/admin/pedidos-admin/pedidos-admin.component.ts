import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import jsPDF from 'jspdf';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { FormaPagoEnum } from 'src/app/model/FormaPagoEnum';
import { Order } from 'src/app/model/Order';
import { OrderProduct } from 'src/app/model/orderProduct';
import { OrderStatusEnum } from 'src/app/model/OrderStatusEnum';
import { Role } from 'src/app/model/Role';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/services/table.service';
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
  expandedTables: { [key: number]: boolean } = {};

  sortOrder: number;
  sortKey: string;
  sortField: string;
  waiterRequests: any[] = [];
  websocketSubscription: Subscription;
  statuses: any[];
  mesasEstado: { tableId: number; estado: 'libre' | 'ocupada' | 'pendiente' }[] = [];

  displayDialog: boolean = false;
  selectedPaymentMethod: number | null;
  orderPay: Order | null;
  paymentMethods: any[] = [
    { label: 'Efectivo', value: FormaPagoEnum.Efectivo },
    { label: 'Tarjeta de crédito', value: FormaPagoEnum.TarjetaCredito },
    { label: 'Tajeta de Debito', value: FormaPagoEnum.TarjetaDebito },
    { label: 'Mercado Pago', value: FormaPagoEnum.MercadoPago },
  ];
  categoriasCocina = [20002, 20003, 20004, 20008];
  pedidoSelected: Order | null;
  displayDetalle = false;
  tables: import('c:/Users/vikim/order-out-front/src/app/model/Table').Table[];
  displayDetalle2: any;
  displayDialog2: boolean;
  mesaApagar: number |null;
  orderspayment: Order[] | null;
displayDialogLibre: any;
  constructor(
    private websocketService: WebSocketService,
    private orderService: OrderService,
    private accountService: AccountService,
    private messageService: MessageService,
    private tableService: TableService
  ) {}
  showDialog(tableId: number) {
    this.displayDialog = true;
    this.mesaApagar = tableId;
    this.orderspayment =  this.orders.filter(item => item.bill.tableWaiter.tableId === tableId);

  }
  onDialogHide() {
    this.pedidoSelected = null;
  }
  hideDialog() {
    this.displayDialog = false;
    this.mesaApagar = null;
  this.displayDialogLibre= false;
    this.displayDialog2 = false;
  }
  abrirPopUpDetalles2(order: Order) {
    this.displayDetalle2 = true;
    this.pedidoSelected = order;
  }
  liberarMesa(tableId: number) {
    const mesa = this.mesasEstado.find(m => m.tableId === tableId);
    if (mesa) {
      mesa.estado = 'libre';
      console.log(this.mesasEstado)
      this.displayDialogLibre= false;
    }
    this.hideDialog();
    this.ngOnInit();

  }
  ocuparMesa(id:number){
    const mesa = this.mesasEstado.find(m => m.tableId === id);
    if (mesa) {
      mesa.estado = 'ocupada';
      console.log(this.mesasEstado)
      this.ngOnInit();
    }
  }
  payTable(id: number) {
      const mesa = this.mesasEstado.find(m => m.tableId === id);
      if (mesa) {
        mesa.estado = 'pendiente';
        console.log(this.mesasEstado)
      }
      this.hideDialog();

  }
  initializeMesaStates() {
    this.tables.forEach(table => {
      const ordersForTable = this.orders.filter(order => order.bill.tableWaiter.tableId === table.id);
      const estado = ordersForTable.length > 0 ? 'ocupada' : 'libre';
      this.mesasEstado.push({ tableId: table.id, estado });
    });
  }
  ngOnDestroy() {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }
  
  confirmSelection() {
    let id = this.orderspayment![0].billId!;
    this.displayDialogLibre = true;
    if (this.selectedPaymentMethod) {
      this.accountService
      .updatePaymentType(
        id,
        +this.selectedPaymentMethod!
      )
      .subscribe((value) => {
        this.orderPay!.bill = value;
      });

      this.orderspayment!.forEach(item => {

        item!.bill.wayToPay = this.selectedPaymentMethod;
        this.onStatusChange(item, { value: 5 });
      })
      this.orderPay = null;
      this.orderspayment = null;
      
    }
  }
  toggleTable(tableId: number) {
    this.expandedTables[tableId] = !this.expandedTables[tableId];
  }

  isTableExpanded(tableId: number): boolean {
    return this.expandedTables[tableId] || false;
  }
  ngOnInit() {
    this.loadTables();
    let user = JSON.parse(localStorage.getItem('authState')!).user;

    let userrolesid = user.usersRoles.map((item: any) => item.name);
    if (userrolesid?.includes('SUPERADMIN') || userrolesid?.includes('ADMIN')) {
      this.statuses = [
        { label: 'Nuevo', value: OrderStatusEnum.Nuevo },
        { label: 'Confirmado', value: OrderStatusEnum.Confirmado },
        { label: 'Preparando', value: OrderStatusEnum.Preparando },
        { label: 'Entregado', value: OrderStatusEnum.Entregado },
        { label: 'Pagado', value: OrderStatusEnum.Pagado },
        { label: 'Cancelado', value: OrderStatusEnum.Cancelado },
      ];
      this.loadOrders(false);
    } else if (userrolesid?.includes('COCINA')) {
      this.statuses = [
        { label: 'Confirmado', value: OrderStatusEnum.Confirmado },
        { label: 'Preparando', value: OrderStatusEnum.Preparando },
        { label: 'Entregado', value: OrderStatusEnum.Entregado },
        { label: 'Cancelado', value: OrderStatusEnum.Cancelado },
      ];
      this.loadOrders(true);
    }
    this.websocketService.sendMessage({ recargar: false });


    this.websocketSubscription = this.websocketService.messages$.subscribe(
      (message) => {
         message.then((value: any) =>{
          console.log(value)
          if(value.recargar){
            this.mesasEstado = [];
            this.ngOnInit();
          }
           if (value) {
               const tableNumber = value.tableNumber; // Accede a tableNumber
               const payTable = value.payTable; // Accede a payTable
   
               if (payTable) {
                   this.visibleBadges.add({
                       tableId: tableNumber, // Usa tableNumber aquí
                       payTable: payTable, // Usa payTable aquí
                   });
               } else {
                   this.visibleBadges.add({
                       tableId: tableNumber, // Usa tableNumber aquí
                       payTable: null, // Si no hay payTable, pon null
                   });
               }
           } else {
               console.warn('Received message does not contain expected structure:', message);
           }
         } );
      }
    );
    
  }
  filterOrdersByTable(tableId: number): any[] {
    return this.orders.filter(order => order.bill.tableWaiter.tableId === tableId);
}

  onStatusChange(order: Order | null, event: any) {
    if (event.value == 5 && this.selectedPaymentMethod == null) {
      this.orderPay = order;

      
    } else {
      order!.status = event.value;
      this.updateOrder(order!);
      this.selectedPaymentMethod = null;
    }
    const request = {recargar: true}
    //this.websocketService.sendMessage(request);
  }

  isPayTableNull(tableId: number): boolean {
    const entry = Array.from(this.visibleBadges).find(
      (data) => data.tableId === tableId
    );

    return entry ? entry.payTable === null : false;
  }
  generatePdfTicket(tableId: number) {
    const ordersTicket = this.orders.filter(item => item.bill.tableWaiter.tableId === tableId);
    const doc = new jsPDF();

    // Encabezado del documento
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Ticket de Órdenes para Mesa #${tableId}`, 10, 15);

    // Línea divisoria después del título
    doc.setDrawColor(0, 0, 0); // Color negro
    doc.setLineWidth(0.5);
    doc.line(10, 20, 200, 20);

    // Espaciado inicial
    let y = 25;
    let total = 0; // Variable para calcular el total

    // Iterar sobre cada orden
    ordersTicket.forEach((order) => {
        // Iterar sobre los productos de cada orden
        order.products.forEach((pedido) => {
            // Producto
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            const producto = `Producto: ${pedido.product.name} X ${pedido.quantity}`;
            doc.text(producto, 10, y);
            y += 8; // Menor espacio entre líneas

            // Observaciones
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            const observaciones = `Observaciones: ${this.getClarification(pedido)}`;
            doc.text(observaciones, 10, y);
            y += 8; // Menor espacio entre líneas

            // Precio
            const precioTotal = pedido.product.price * pedido.quantity;
            total += precioTotal; // Acumular el precio total
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`Precio: $${precioTotal.toFixed(2)}`, 10, y);
            y += 8; // Menor espacio entre líneas

            // Línea divisoria entre productos
            doc.setDrawColor(200, 200, 200); // Color gris claro
            doc.setLineWidth(0.2);
            doc.line(10, y, 200, y);
            y += 5; // Espacio antes de la siguiente línea divisoria
        });

        // Añadir espacio extra entre órdenes
        y += 5;

        // Añadir página nueva si el contenido es muy largo
        if (y > 270) {
            doc.addPage();
            y = 15; // Reiniciar el espaciado en la nueva página
        }
    });

    // Mostrar total al final del ticket
    y += 10; // Espacio antes del total
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${total.toFixed(2)}`, 10, y);

    // Guardar el PDF con un nombre descriptivo
    doc.save(`ticket-mesa-${tableId}.pdf`);
}
  generarPDf(pedido: Order) {
    const doc = new jsPDF();

    // Encabezado del documento
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Detalle del Pedido #${pedido.id}`, 10, 20);

    // Línea divisoria después del título
    doc.setDrawColor(0, 0, 0); // Color negro
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Espaciado inicial
    let y = 35;

    pedido.products.forEach((pedido) => {
        // Producto
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        const producto = `Producto: ${pedido.product.name} X ${pedido.quantity}`;
        doc.text(producto, 10, y);
        y += 10;

        // Observaciones
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const observaciones = `Observaciones: ${this.getClarification(pedido)}`;
        doc.text(observaciones, 10, y);
        y += 10;

        // Línea divisoria entre productos
        doc.setDrawColor(200, 200, 200); // Color gris claro
        doc.setLineWidth(0.2);
        doc.line(10, y, 200, y);
        y += 10;
    });

    // Guardar el PDF con un nombre descriptivo
    doc.save(`detalle-pedido-${pedido.id}.pdf`);
}

  getPayTable(tableId: number): any | null {
    const entry = Array.from(this.visibleBadges).find(
      (data) => data.tableId === tableId
    );
    return entry ? entry.payTable : null;
  }

  loadOrders(cocina: boolean) {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      console.log(orders)
      if (cocina) {
        this.orders = orders
          .filter(
            (item) =>
              [2, 3, 4, 6].includes(item.status) && !item.bill.isPaid
          )
          .sort((a, b) => a.status - b.status);
        this.todasOrdenes = orders
          .filter(
            (item) =>
              [2, 3, 4, 6].includes(item.status) && !item.bill.isPaid
          )
          .sort((a, b) => a.status - b.status);
      } else {
        this.orders = orders.filter(item => !item.bill.isPaid).sort((a, b) => a.status - b.status);
        this.todasOrdenes = orders.sort((a, b) => a.status - b.status);
      }
      this.initializeMesaStates();
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
  abrirPopUpDetalles(order: Order) {
    this.displayDetalle = true;
    this.pedidoSelected = order;
  }

  getClarification(pedido: OrderProduct) {
    return pedido.clarification ? pedido.clarification : '-';
  }

  getTotalAmount(order: Order): number {
    let total = 0;
    order.products.forEach((product) => {
      total = total + product.product.price;
    });
    return total;
  }
  loadTables() {
    this.tableService.getAllTable().subscribe((value) => {
      this.tables = value;
    });
  }
  updateOrder(order: Order) {
    this.orderService.updateOrder(order).subscribe(
      (updatedOrder) => {
        this.ngOnInit();
        const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
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
      this.orders = this.todasOrdenes.filter((order) => order.status === value);
    } else {
      this.orders = this.todasOrdenes; // Muestra todas las órdenes si no hay filtro
    }
  }
  getStatusName(id: any): String {
    return OrderStatusEnum.getStatusName(id);
  }
  getTotalForTable(tableId: number): number {
    const ordersForTable = this.orders.filter(order => order.bill.tableWaiter.tableId === tableId);
    return ordersForTable.reduce((total, order) => {
      return total + this.getTotalAmount(order);
    }, 0);
  }
  getTableStatus(tableId: number): 'libre' | 'ocupada' | 'pendiente' {
    const mesa = this.mesasEstado.find(m => m.tableId === tableId);
    return mesa ? mesa.estado : 'libre';
  }
  
}

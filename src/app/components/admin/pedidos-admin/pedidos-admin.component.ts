import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { Waiter } from 'src/app/model/Waiter';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsState, selectNotifiedTables } from 'src/app/states/Notifications.reducer';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.scss']
})
export class PedidosAdminComponent implements OnInit {

 //orders: Order[];
  selectedOrder: Order;
  product1 = new Product(1, 'Coffee',3.5, new Category(1, 'cat1'), '','',true,false);
  product2 = new Product(2, 'Sandwich', 5.0,  new Category(1, 'cat2'), '','',true,false);
  product3 = new Product(3, 'Salad', 7.0,  new Category(1, 'cat3'), '','',true,false);
  
   waiter1 = new Waiter(1, 'John Doe');
   waiter2 = new Waiter(2, 'Jane Smith');
   sortOptions: SelectItem[];

   sortOrder: number;
   sortKey:string;
   sortField: string;
  orders: Order[] = [



  ];
  notifiedTables$: Observable<Set<number>>;

  constructor(private orderService: OrderService,private store:Store<NotificationsState>, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.notifiedTables$ = this.store.select(selectNotifiedTables);
  }
  shouldShowBadge(tableNumber: number): Observable<boolean> {
    let reponse= this.notifiedTables$.pipe(
      map((notifiedTables: Set<number>) => {return notifiedTables.has(tableNumber)})
    );
    return reponse;
  }
  ngOnInit() {
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];
  this.primengConfig.ripple = true;
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders;
        console.log(orders);
      },
      error => {
        console.error('Error loading orders: ', error);
      }
    );
  }
  getOrderDescriptions(order: any): string | null {
    if(order.products !=null){
      return order.products.map((product: Product) => product.name).join(', ');
    }else{return null}
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

  onSortChange(event: any ) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}

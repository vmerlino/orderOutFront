import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TableState } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/Order';
import { MercadoPagoServiceService } from 'src/app/services/mercado-pago-service.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { selectOrders } from 'src/app/states/OrderState.reducer';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  pagoEfectivo: String;
  orders: Order[];
  totalPagar: number;
  table$: Observable<any>;
  table: Table;
  metodosDePago = [
  { label: 'Tarjeta', value: 'tarjeta' },
  { label: 'Efectivo', value: 'efectivo' }
];

  metodoPagoSeleccionado: string;
  constructor(
    private mercadoPagoService: MercadoPagoServiceService,
    private websocketService: WebSocketService,
    private store: Store<{ table: TableState }>
  ) {
    this.table$ = this.store.select((state) =>
      state.table ? state.table : null
    );
  }
  getTip(){
  return  this.orders[this.orders.length-1].bill.tip;
  }
  ngOnInit(): void {
    this.store.pipe(select(selectOrders)).subscribe((value) => {
      this.orders = value.filter( item  => [1,2,3,4].includes(item.status));
    });
    this.table$.subscribe((table: any) => {
      this.table = table.table;
    });
  }

  realizarPagoEfectivo() {
    if(this.pagoEfectivo!= null){
    const request = { tableNumber: this.table.id, payTable: this.pagoEfectivo };
    this.websocketService.sendMessage(request);
    }else{
      const request = { tableNumber: this.table.id, payTable: 'tarjeta' };
      this.websocketService.sendMessage(request); 
    }
  }
  getTenPercentOfTotal(order: Order): number {
    if(order.totalAmount){
    let total = 0 ; 
    order.products.forEach(product =>{
      total = total + product.product.price;
    });

    total = (total) * (10 / 100)
    return total;  
    }
    return 0;
  }
  realizarPagoMercadoPago() {
    const id = this.orders[0].billId;
    this.mercadoPagoService
      .realizarPagoMercadoPago(id)
      .subscribe((value) => {
        window.open(value, '_blank');
      });
  }

  getTotalAmounts(){
    return  this.orders[this.orders.length-1].bill.amount;

  }
}

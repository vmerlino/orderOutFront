import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/model/Order';
import { OrderStatusEnum } from 'src/app/model/OrderStatusEnum';
import { selectOrders } from 'src/app/states/OrderState.reducer';

@Component({
  selector: 'app-pedidos-realizados',
  templateUrl: './pedidos-realizados.component.html',
  styleUrls: ['./pedidos-realizados.component.scss']
})
export class PedidosRealizadosComponent implements OnInit {
  total: number = 45.00;
  estado: string = 'En Preparación';
  tiempoEstimado: string = 'Aproximadamente 30 minutos';
  pedidos: Order[];
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectOrders).subscribe(value =>{
      this.pedidos = value;
    });
  }
  getStatusName(id: any): String {
    return OrderStatusEnum.getStatusName(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/model/Order';
import { OrderStatusEnum } from 'src/app/model/OrderStatusEnum';
import { OrderService } from 'src/app/services/order.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { clearOrders } from 'src/app/states/OrderState.actions';
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
  pedidos: Order[] = [];
  categoriasCocina = [20002, 20003, 20004, 20008];
  websocketSubscription: Subscription;
hayMozoOrder= false;
  pedidosAll:Order[]=[];


  constructor(private webSockertService: WebSocketService ,private store: Store, private orderService: OrderService) { }
  ngOnDestroy() {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.store.select(selectOrders).subscribe(value =>{
      value.forEach(item => {
        this.orderService.getOrderById(item.id).subscribe(value2=>{
          if(!value2.bill.isPaid && this.categoriasCocina.includes(item.products[0].product.categoryId)){
            this.pedidos.push(value2);
          }
          if(!value2.bill.isPaid){
            this.pedidosAll.push(value2);
            console.log(this.pedidosAll)
          }
          if(!this.categoriasCocina.includes(item.products[0].product.categoryId)){
            this.hayMozoOrder = true;
          }
        })
      })
    });
    this.webSockertService.sendMessage({ nada: false });


    this.websocketSubscription = this.webSockertService.messages$.subscribe(
      (message) => {
         message.then((value: any) =>{
          if (value.pagado === 'pagado') {
            this.store.dispatch(clearOrders());
            this.pedidos = []
            this.ngOnInit();
          }
          if(value.recargar){
            console.log("state")
            this.pedidos = []
            this.ngOnInit();
          }
         })
      });
  }
  getTime(id: number){
   let pedido =  this.pedidos.filter(item => item.id == id);
   let mayor = 0;

   pedido[0].products.forEach( product => {
      if (product.product.making >= mayor){
        mayor = product.product.making;
      }
   })
    return mayor;
  }
  getStatusName(id: any): String {
    return OrderStatusEnum.getStatusName(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OrderDto } from 'src/app/model/Dtos/OrderDto';
import { OrderProductDto } from 'src/app/model/Dtos/OrderProductDto';
import { Order } from 'src/app/model/Order';
import { OrderStatusEnum } from 'src/app/model/OrderStatusEnum';
import { Product } from 'src/app/model/Product';
import { Table } from 'src/app/model/Table';
import { Waiter } from 'src/app/model/Waiter';
import { OrderProduct } from 'src/app/model/orderProduct';
import { ProductService } from 'src/app/services/ProductService';
import { OrderService } from 'src/app/services/order.service';
import { addProduct, clearCart, removeProduct } from 'src/app/states/CarritoState.actions';
import { ProductState } from 'src/app/states/CarritoState.reducer';
import { addOrder } from 'src/app/states/OrderState.actions';
import { selectOrders } from 'src/app/states/OrderState.reducer';
import { clearTable } from 'src/app/states/TableState.actions';
import { TableState } from 'src/app/states/TableState.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  table$:Observable<any>;
  table:Table;
  products$: Observable<any>;
  productList:  OrderProduct[] = [];
  productImages: Map<number, SafeResourceUrl> = new Map(); // Map para almacenar imágenes por ID
  imagePromises: any;

  constructor(private productService: ProductService, private orderService:OrderService,private messageService: MessageService ,private store: Store<{ products: ProductState,table: TableState }>) {
    this.products$ = this.store.select(state => state.products? state.products : []);
    this.table$ = this.store.select(state => state.table ? state.table :null);

  }

  ngOnInit(): void {
    this.products$.subscribe((products:any) => {
      if(products.products != null){
        this.productList = products.products;
        this.loadProductImages();
      }
    });
    this.table$.subscribe((table: any) => {
      this.table = table.table;
    });
  }
  async loadProductImages(): Promise<void> {
      this.imagePromises = this.productList.map(async product => {
      const image = await this.productService.getImage(product.product.id);
      this.productImages.set(product.product.id, image);
    });

    // Esperar a que todas las imágenes se carguen
    await Promise.all(this.imagePromises);
  }
  addToCart(product: any) {
    this.store.dispatch(addProduct({ product }));
  }

  removeFromCart(product: any) {
    this.store.dispatch(removeProduct({ product }));
  }

  crearOrden() {
    let productsQuantity : OrderProductDto[] = [];
    let productQ : OrderProductDto;
    let totalAmount=0;
   
    this.productList.forEach((product:OrderProduct) => {
      let product2 =new Product(product.product.id, product.product.name, product.product.price, product.product.category, product.product.description, product.product.imageUrl, product.product.isVegan,product.product.isGlutenFree, 0, null);
      let  quantity = product.quantity;
      let clarification = product.clarification;
      totalAmount += product.product.price;
      productQ = new OrderProductDto( product2.id, quantity, clarification);
      productsQuantity.push(productQ);
    })
    //totalAmount += (totalAmount * (10 / 100));
    let orderCreate = new OrderDto(this.table.id,totalAmount,new Date(), OrderStatusEnum.Nuevo, 1,productsQuantity);
    this.store.select(selectOrders).subscribe(value => {
      if(value.length > 0){
        orderCreate.billId = value[0].billId;
      }else{
        orderCreate.billId = null;
      }
      });
    this.orderService.createOrder(orderCreate).subscribe(value =>{
      if(value){
        this.messageService.add({
          severity: 'success',
          summary: 'Pedido Creado',
          detail: 'El pedido se ha creado exitosamente.'
        });
        this.store.dispatch(addOrder({order: value}));
        this.store.dispatch(clearCart());
        this.productList =[];
      }
    })
  }

  getImages(id: number): SafeResourceUrl | undefined{
    return this.productImages.get(id);
  }
}

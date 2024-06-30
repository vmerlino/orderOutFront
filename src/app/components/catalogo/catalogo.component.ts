import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { VirtualScroller } from 'primeng/virtualscroller';
import { Observable, combineLatest, take } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { Table } from 'src/app/model/Table';
import { OrderProduct } from 'src/app/model/orderProduct';
import { ProductService } from 'src/app/services/ProductService';
import { NotificationsService } from 'src/app/services/notifications.service';
import { addProduct, removeProduct } from 'src/app/states/CarritoState.actions';
import { ProductState } from 'src/app/states/CarritoState.reducer';
import { requestWaiter } from 'src/app/states/Notifications.actions';
import { NotificationsState } from 'src/app/states/Notifications.reducer';
import { TableState, selectTable } from 'src/app/states/TableState.reducer';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  @ViewChild('virtualScroller') virtualScroller: VirtualScroller;
  @Output() waiterRequested: EventEmitter<number> = new EventEmitter();

  listCart$: Observable<OrderProduct[]>;
  cartItem: Observable<OrderProduct>;
  products!: Product[];
  virtualProducts!: Product[];
  sortKey!: string;
  sortOptions!: SelectItem[];
  table: any | null;
  table$: Observable<any | null>;
  products2: any[];
  filteredOrders: Product[];
  combinedProducts: any[] = [];

  constructor(private productService: ProductService, private notificationsService: NotificationsService, private store2: Store<{ table: TableState }>, private store: Store<{ products: ProductState, notification: NotificationsState }>) {
    this.table$ = this.store2.select(state => state.table ? state.table : null);

  }
  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
    this.quantitysUpdate();
    this.virtualProducts = Array.from({ length: 10 });

    this.table$.subscribe(table => {
      this.table = table.table;
    });
  }
  pedirMozo() {
    this.store.dispatch(requestWaiter({ tableNumber: this.table.id }));
  }
  addToCart(product: any) {
    let param = product.product
    this.store.dispatch(addProduct({ product: param }));
    this.quantitysUpdate();
    
  }
  removeFromCart(product: any) {
    this.store.dispatch(removeProduct({ product }));
    this.quantitysUpdate();
  }
  filtrarCategoria(categoria: String) {
    this.quantitysUpdate();
    this.combinedProducts = this.combinedProducts.filter(product => product.product.category.name === categoria);
    console.log(this.combinedProducts)
    this.virtualScroller?.scrollToIndex(0);
  }
  quantitysUpdate() {
    combineLatest([
      this.productService.getAllProducts(),
      this.store.pipe(select(state => state.products.products))
    ]).subscribe(([allProducts, cartProducts]) => {
      const cartProductsMap = cartProducts ? new Map(cartProducts.map(p => [p.product.id, p])) : new Map();
      
      this.combinedProducts = allProducts.map(product => {
        const cartProduct = cartProductsMap.get(product.id);
        return {
          product,
          quantity: cartProduct ? cartProduct.quantity : 0,
          clarifications: cartProduct ? cartProduct.clarifications : ''
        };
      });
    });
  }
  
  /*this.sortOptions = [
    { label: 'Cheapest First', value: 'price' },
    { label: 'Expensive First', value: '!price' },
  ];*/

}

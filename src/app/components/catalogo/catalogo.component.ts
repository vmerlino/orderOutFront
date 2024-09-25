import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { VirtualScroller } from 'primeng/virtualscroller';
import { Observable, combineLatest, firstValueFrom } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { OrderProduct } from 'src/app/model/orderProduct';
import { ProductService } from 'src/app/services/ProductService';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { addProduct, removeProduct } from 'src/app/states/CarritoState.actions';
import { ProductState } from 'src/app/states/CarritoState.reducer';
import { NotificationsState } from 'src/app/states/Notifications.reducer';
import { TableState } from 'src/app/states/TableState.reducer';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
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
  filterSelected: String;
  productImages: Map<number, SafeResourceUrl> = new Map(); // Map para almacenar imágenes por ID

  constructor(
    private websocketService: WebSocketService,
    private productService: ProductService,
    private router: Router,
    private store2: Store<{ table: TableState }>,
    private store: Store<{
      products: ProductState;
      notification: NotificationsState;
    }>
  ) {
    this.table$ = this.store2.select((state) =>
      state.table ? state.table : null
    );
  }

  async ngOnInit() {
    await this.loadProductImages(); 
    this.quantitysUpdate();
    this.table$.subscribe((table) => {
      this.table = table.table;
    });
  }

  async loadProductImages(): Promise<void> {
    const products = await firstValueFrom(this.productService.getAllProducts());

    this.products = products; 
    const imagePromises = products.map(async product => {
      const image = await this.productService.getImage(product.id);
      this.productImages.set(product.id, image);
    });

    // Esperar a que todas las imágenes se carguen
    await Promise.all(imagePromises);
  }

  pedirMozo() {
    console.log("table")
    console.log(this.table)
    const request = { tableNumber: this.table.id };
    this.websocketService.sendMessage(request);
  }

  goToProductDetail(product: any) {
    this.router.navigate(['/product-detail'], { state: { product: product } });
  }

  addToCart(product: any) {
    let param = product.product;
    this.store.dispatch(addProduct({ product: param }));
    this.filterSelected && this.filterSelected !== "todo" ? this.filtrarCategoria(this.filterSelected) : this.quantitysUpdate();
  }

  removeFromCart(product: any) {
    let param = product.product;
    this.store.dispatch(removeProduct({ product: param }));
    this.filterSelected && this.filterSelected !== "todo" ? this.filtrarCategoria(this.filterSelected) : this.quantitysUpdate();
  }

  async filtrarCategoria(categoria: String) {
    if (categoria !== "todo") {
      this.filterSelected = categoria;
      await this.quantitysUpdate();
      this.combinedProducts = this.combinedProducts.filter(
        (product) => product.product.category.name.toLowerCase() === categoria
      );
      this.virtualScroller?.scrollToIndex(0);
    } else {
      await this.quantitysUpdate();
    }
  }

  async quantitysUpdate() {
    // Ejecutar ambas peticiones en paralelo
    const [allProducts, cartProducts] = await firstValueFrom(combineLatest([
      this.productService.getAllProducts(),
      this.store.pipe(select((state) => state.products.products)),
    ]));

    // Crear un Map de cartProducts para búsqueda rápida
    const cartProductsMap = new Map(cartProducts?.map(p => [p.product.id, p]) || []);

    // Usar Array.map para construir combinedProducts
    this.combinedProducts = allProducts.map(product => {
      const cartProduct = cartProductsMap.get(product.id);

      return {
        product,
        quantity: cartProduct?.quantity || 0,
        clarifications: cartProduct?.clarification || '',
      };
    });
  }

  getImages(id: number): SafeResourceUrl | undefined{
    return this.productImages.get(id);
  }
}

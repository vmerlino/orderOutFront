import { Component, OnInit, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { VirtualScroller } from 'primeng/virtualscroller';
import { combineLatest, firstValueFrom } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { OrderProduct } from 'src/app/model/orderProduct';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/ProductService';
import { addProduct, removeProduct } from 'src/app/states/CarritoState.actions';
import { ProductState } from 'src/app/states/CarritoState.reducer';
import { selectOrders } from 'src/app/states/OrderState.reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild('virtualScroller') virtualScroller: VirtualScroller;

  filteredProducts: OrderProduct[];
  products: Product[];
  combinedProducts: any;
  allOrderProducts: any;
  productImages: Map<number, SafeResourceUrl> = new Map(); // Map para almacenar imágenes por ID
  searchTerm: any;

  constructor(
    private store: Store<{
      products: ProductState;
    }>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProductImages();
    this.store
      .select(selectOrders)
      .subscribe((value) => (this.allOrderProducts = value));
    this.quantitysUpdate();
  }

  async loadProductImages(): Promise<void> {
    const products = await firstValueFrom(this.productService.getAllProducts());

    this.products = products;
    const imagePromises = products.map(async (product) => {
      const image = await this.productService.getImage(product.id);
      this.productImages.set(product.id, image);
    });

    // Esperar a que todas las imágenes se carguen
    await Promise.all(imagePromises);
  }
  async quantitysUpdate() {
    // Ejecutar ambas peticiones en paralelo
    const [allProducts, cartProducts] = await firstValueFrom(
      combineLatest([
        this.productService.getAllProducts(),
        this.store.pipe(select((state) => state.products.products)),
      ])
    );
    const cartProductsMap = new Map(
      cartProducts?.map((p) => [p.product.id, p]) || []
    );

    this.filteredProducts = allProducts.map((product) => {
      const cartProduct = cartProductsMap.get(product.id);

      return {
        product,
        quantity: cartProduct?.quantity || 0,
        clarification: cartProduct?.clarification || '',
      };
    });
    this.combinedProducts = this.filteredProducts;
  }

  getImages(id: number): SafeResourceUrl | undefined {
    return this.productImages.get(id);
  }
  filterProducts(event: any | null) {
    this.searchTerm = event.target.value;
    console.log(this.searchTerm)
    if (this.searchTerm != null && this.searchTerm != '') {
      this.filteredProducts = this.combinedProducts.filter((product: any) => {
        return product.product.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
      console.log(this.filteredProducts)
      this.virtualScroller?.scrollToIndex(0);
    } else {
      this.filteredProducts = [];
      this.ngOnInit();
    }
  }

  addToCart(product: any) {
    let param = product.product;
    product.quantity +=1;
    this.store.dispatch(addProduct({ product: param }));
    this.filterProducts({ target: { value: this.searchTerm } });

  }

  removeFromCart(product: any) {
    let param = product.product;
    product.quantity -=1;
    this.store.dispatch(removeProduct({ product: param }));
    this.filterProducts({ target: { value: this.searchTerm } });
  }
}

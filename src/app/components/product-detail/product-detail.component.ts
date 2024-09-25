import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/services/ProductService';
import { addProduct, removeProduct, updateClarification } from 'src/app/states/CarritoState.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productQuantity: any;
  clarification: string = '';
  imagen: SafeResourceUrl | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  async ngOnInit(): Promise<void> {
    this.productQuantity = history.state.product;
    this.clarification = this.productQuantity.clarification;
    this.imagen = await this.productService.getImage(
      this.productQuantity.product.id
    );
  }
  addToCart() {
    let param = this.productQuantity.product;
    this.productQuantity.quantity += 1;
    this.store.dispatch(addProduct({ product: param }));
  }

  removeFromCart() {
    let param = this.productQuantity.product;
    this.productQuantity.quantity -= 1;
    this.store.dispatch(removeProduct({ product: param }));
  }
  changeClarification(event: any): void {
    let clarification = event.target.value;
    if (clarification.trim() !== '') {
      this.store.dispatch(
        updateClarification({
          productId: this.productQuantity.product.id,
          clarification: clarification,
        })
      );
    }
  }
}

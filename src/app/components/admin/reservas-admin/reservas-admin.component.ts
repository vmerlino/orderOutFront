import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-reservas-admin',
  templateUrl: './reservas-admin.component.html',
  styleUrls: ['./reservas-admin.component.scss']
})
export class ReservasAdminComponent implements OnInit {
  products: Product[];

  product:Product;

  selectedProduct1: Product;

  selectedProduct2: Product;

  selectedProduct3: Product;

  selectedProducts1: Product[];

  selectedProducts2: Product[];

  selectedProducts3: Product[];

  selectedProducts4: Product[];

  selectedProducts5: Product[];

  constructor(private productService: ProductService, private messageService: MessageService) {
      this.isRowSelectable = this.isRowSelectable.bind(this);
  }

  ngOnInit() {
      this.productService.getProductsSmall().then(data => this.products = data);
  }

  selectProduct(product: Product) {
      this.messageService.add({severity:'info', summary:'Product Selected', detail: product.name});
  }

  onRowSelect(event:any) {
      this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
  }

  onRowUnselect(event:any) {
      this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
  }

  isRowSelectable(event:any) {
      return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data:any) {
      return data.inventoryStatus === 'OUTOFSTOCK';
  }


}

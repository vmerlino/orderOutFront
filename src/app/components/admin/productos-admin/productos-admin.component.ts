import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.scss']
})
export class ProductosAdminComponent implements OnInit {
    displayDialog =false;
    products: Product[];
    selectedProduct: Product;
    productImages: Map<number, SafeResourceUrl> = new Map(); // Map para almacenar imágenes por ID
    imagePromises: any;
    constructor(private productService: ProductService, private messageService: MessageService) {}
  
    ngOnInit() {
      this.loadProducts();
    }
  
    loadProducts() {
      this.productService.getAllProducts().subscribe(
        products => {
          this.products = products;
          this.loadProductImages();
          console.log(this.products)
        },
        error => {
          console.error('Error loading products: ', error);
        }
      );
    }
    async loadProductImages(): Promise<void> {
      this.imagePromises = this.products.map(async product => {
      const image = await this.productService.getImage(product.id);
      this.productImages.set(product.id, image);
    });

    // Esperar a que todas las imágenes se carguen
    await Promise.all(this.imagePromises);
  }

  getImages(id: number){
     return this.productImages.get(id);
  }

    addProduct(product: Product) {
      this.productService.createProduct(product).subscribe(
        newProduct => {
          this.products.push(newProduct);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
        },
        error => {
          console.error('Error adding product: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding product' });
        }
      );
    }
    cerrarDialogo() {
      this.displayDialog = false;
    }
    abrirDialogo() {
      this.displayDialog = true;
    }
    updateProduct() {
      this.cerrarDialogo();
      this.loadProducts();
    }
  
    deleteProduct() {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe(
          () => {
            this.products = this.products.filter(p => p.id !== this.selectedProduct.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
          },
          error => {
            console.error('Error deleting product: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product' });
          }
        );
      }

  
    selectProduct(product: Product) {
      this.selectedProduct = product;
      this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    }
  
    onRowSelect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
    }
  
    onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
    }
  
    isRowSelectable(event: any) {
      return !this.isOutOfStock(event.data);
    }
  
    isOutOfStock(data: any) {
      return data.inventoryStatus === 'OUTOFSTOCK';
    }
  
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.scss']
})
export class ProductosAdminComponent implements OnInit {
  
    products: Product[];
    selectedProduct: Product;
  
    constructor(private productService: ProductService, private messageService: MessageService) {}
  
    ngOnInit() {
      this.loadProducts();
    }
  
    loadProducts() {
      this.productService.getAllProducts().subscribe(
        products => {
          this.products = products;
        },
        error => {
          console.error('Error loading products: ', error);
        }
      );
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
  
    updateProduct(product: Product) {
      this.productService.updateProduct(product.id, product).subscribe(
        updatedProduct => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
        },
        error => {
          console.error('Error updating product: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating product' });
        }
      );
    }
  
    deleteProduct(product: Product) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            this.products = this.products.filter(p => p.id !== product.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
          },
          error => {
            console.error('Error deleting product: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product' });
          }
        );
      }
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

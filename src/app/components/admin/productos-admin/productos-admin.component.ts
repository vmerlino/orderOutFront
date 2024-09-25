import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { CategoryService } from 'src/app/services/CategoryService';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.scss'],
})
export class ProductosAdminComponent implements OnInit {
toggleSelection(product:Product, event: any) {
  console.log(event)
if(event.isTrusted){
this.selectedProduct = product;
}else{
this.selectedProduct = null;
}
}
  displayDialog = false;
  products: Product[];
  selectedProduct: Product | null;
  productImages: Map<number, SafeResourceUrl> = new Map(); // Map para almacenar imágenes por ID
  imagePromises: any;
  selectedProducts: any;
  displayPopupMasivo = false;
  categorias: Category[];
  selectedCategory: Category | null;
  increasePercentage: number | null;
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.categoryService.getAllCategories().subscribe((value) => {
      this.categorias = value;
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.loadProductImages();
      },
      (error) => {
        console.error('Error loading products: ', error);
      }
    );
  }
  async loadProductImages(): Promise<void> {
    this.imagePromises = this.products.map(async (product) => {
      const image = await this.productService.getImage(product.id);
      this.productImages.set(product.id, image);
    });

    // Esperar a que todas las imágenes se carguen
    await Promise.all(this.imagePromises);
  }
  changeHidden(product: Product, event: any) {
    product.hidden = event.checked;
    console.log(product)
    this.productService
      .updateProduct( product)
      .subscribe((value) => {});
  }
  getImages(id: number) {
    return this.productImages.get(id);
  }
  popupMasivo() {
      this.displayPopupMasivo = true;
  }
  cancelUpdate() {
    this.selectedCategory = null;
    this.increasePercentage = null;
    this.displayPopupMasivo = false;
  }
  updatePrices() {
    let porcentaje = this.increasePercentage! / 100;
    this.productService
      .updateProductMassive(porcentaje, this.selectedCategory!.id)
      .subscribe((value) => {
        this.cancelUpdate();
      });
    this.loadProducts();
  }
  addProduct(product: Product) {
    this.productService.createProduct(product).subscribe(
      (newProduct) => {
        this.products.push(newProduct);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added successfully',
        });
      },
      (error) => {
        console.error('Error adding product: ', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error adding product',
        });
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
    this.productService.deleteProduct(this.selectedProduct!.id).subscribe(
      () => {
        this.products = this.products.filter(
          (p) => p.id !== this.selectedProduct!.id
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product deleted successfully',
        });
      },
      (error) => {
        console.error('Error deleting product: ', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error deleting product',
        });
      }
    );
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: product.name,
    });
  }

  onRowSelect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: event.data.name,
    });
  }

  onRowUnselect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Unselected',
      detail: event.data.name,
    });
  }

  isRowSelectable(event: any) {
    return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data: any) {
    return data.inventoryStatus === 'OUTOFSTOCK';
  }
}

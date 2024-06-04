import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { CategoryService } from 'src/app/services/CategoryService';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.scss']
})
export class ProductoCreateComponent implements OnInit {

  @Input() displayDialog: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() product: Product;

  accion='Agregar';
  nombre: string;
  precio: number;
  categoryId: number;
  descripcion:string;
  category:Category;
  categories:Category[];
  isVegan:boolean = false;
  isGluteenFree: boolean = false;
  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    if(this.product){
      this.accion='Modificar';
    }
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  guardar() {
    this.product = new Product(null, this.nombre, this.precio, this.category, this.descripcion, null, this.isVegan,this.isGluteenFree);
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {
        console.log('Producto creado exitosamente', response);
        this.cerrarDialogo();
      },
      error: (error) => {
        console.error('Error al crear el Producto', error);
      }
    });
  }

  cancelar() {
    this.cerrarDialogo();
  }

  cerrarDialogo() {
    this.displayDialog = false;
    this.onClose.emit();
  }
}

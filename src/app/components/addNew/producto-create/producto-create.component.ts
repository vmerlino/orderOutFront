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
  _productSelect: Product;
  @Input() displayDialog: boolean = false;
  @Input() set product(value: Product) {
    this._productSelect = value;
    if(value){
      this.accion='Modificar';
      this.nombre = value.name;
    }   
  } 
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateCategories: EventEmitter<void> = new EventEmitter<void>();

  selectedFile: File;
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
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  guardar() {
    console.log(this.selectedFile);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;

        // Guarda la imagen en la carpeta 'assets/images'
        this.guardarImagenEnAssets(base64Image, this.selectedFile.name);

        // Guarda el nombre de la imagen en el producto
        this.product.imageUrl = `assets/images/${this.selectedFile.name}`;
        
        // Aquí puedes hacer la lógica para guardar el producto
        console.log('Producto guardado', this.product);
        this.displayDialog = false;
      };
      reader.readAsDataURL(this.selectedFile);
    this.product = new Product(0, this.nombre, this.precio, this.category, this.descripcion, null, this.isVegan,this.isGluteenFree);
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
}

  cancelar() {
    this.cerrarDialogo();
  }
  onImageSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }
  guardarImagenEnAssets(base64Image: string, fileName: string) {
    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = fileName;

    // Simular clic en el enlace para iniciar la descarga
    link.click();

    // Eliminar el enlace temporal
    link.remove();
  }
  cerrarDialogo() {
    this.displayDialog = false;
    this.onClose.emit();
  }
}

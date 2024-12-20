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
  _productSelect: Product | null;
  @Input() displayDialog: boolean = false;
making: any;
  @Input() set product(value: Product | null) {
    this._productSelect = value;
    if(value){
      this.accion='Modificar';
      this.nombre = value.name;
      this.precio = value.price;
      this.descripcion = value.description;
      this.making = value.making;
      this.isVegan = value.isVegan;
      this.isGluteenFree = value.isGlutenFree;
      this.category = value.category;
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
    console.log(this._productSelect)
    if(this._productSelect != null){
      let product = new Product(this._productSelect.id, this.nombre, this.precio, this.category, this.descripcion, null, this.isVegan,this.isGluteenFree,this.selectedFile, this.selectedFile, this.making );
     console.log(product)
      this.productService.updateProduct(product).subscribe({next: (response) => {
        console.log('Producto creado exitosamente', response);
        this.cerrarDialogo();
      }})
    }
    else{
      if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      const formData = new FormData();
      formData.append('name', this.nombre);
      formData.append('price', this.precio.toString());
      formData.append('description', this.descripcion);
      formData.append('isVegan', this.isVegan.toString());
      formData.append('isGluteenFree', this.isGluteenFree.toString());
      formData.append('making', this.making );
      
      formData.append('photo', this.selectedFile );
      if( this.category.id){
        let idcat = this.category.id?.toString();
        formData.append('categoryId', idcat);
      }


    this.productService.createProduct(formData).subscribe({
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
}

  cancelar() {
    this.cerrarDialogo();
  }
  onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];
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

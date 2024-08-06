import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/services/CategoryService';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  private _categorySelect: Category;

  @Input() displayDialog: boolean = false;
  @Input() set categorySelect(value: Category) {
    this._categorySelect = value;
    if(value){
      this.accion='Modificar';
      this.nombre = value.name;
    }   
  } 
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateCategories: EventEmitter<void> = new EventEmitter<void>();

  accion = 'Agregar'
  nombre: string;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {    
  }

  guardar() {
    this.categorySelect = new Category(0,  this.nombre);
    this.categoryService.createCategory(this.categorySelect).subscribe({
      next: (response) => {
        console.log('Categoría creada exitosamente', response);
        this.updateCategories.emit();
        this.cerrarDialogo();
      },
      error: (error) => {
        console.error('Error al crear la categoría', error);
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

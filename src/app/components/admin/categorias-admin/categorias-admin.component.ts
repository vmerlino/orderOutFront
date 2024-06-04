import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/services/CategoryService';

@Component({
  selector: 'app-categorias-admin',
  templateUrl: './categorias-admin.component.html',
  styleUrls: ['./categorias-admin.component.scss']
})
export class CategoriasAdminComponent implements OnInit {
    displayDialog: boolean = false;
    categories: Category[];
    category: Category;
    selectedCategory: Category;
  
    constructor(private categoryService: CategoryService, private messageService: MessageService) {}
  
    ngOnInit() {
      this.loadCategories();
    }
  
    loadCategories() {
      this.categoryService.getAllCategories().subscribe(
        categories => {
          this.categories = categories;
          console.log(categories);
        },
        error => {
          console.error('Error loading categories: ', error);
        }
      );
    }
    
    updateCategories() {
      this.cerrarDialogo();
      this.loadCategories();
    }

    modificarCategoria(){

    }

    deleteCategory() {
        this.categoryService.deleteCategory(this.selectedCategory.id).subscribe(
          () => {
            this.categories = this.categories.filter(c => c.id !== this.selectedCategory.id);
            console.log({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
          },
          (error:any) => {
            console.error('Error deleting category: ', error);
          }
        );
      }
    
    
    cerrarDialogo() {
      this.displayDialog = false;
    }
    abrirDialogo() {
      this.displayDialog = true;
    }
    selectCategory(category: Category) {
      this.selectedCategory = category;
      this.messageService.add({ severity: 'info', summary: 'Category Selected', detail: category.name });
    }
  
    onRowSelect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Category Selected', detail: event.data.name });
    }
  
    onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Category Unselected', detail: event.data.name });
    }
    
    isRowSelectable(event: any) {
      return !this.isOutOfStock(event.data);
    }
    
    isOutOfStock(data: any) {
      return data.inventoryStatus === 'OUTOFSTOCK';
    }
    
}

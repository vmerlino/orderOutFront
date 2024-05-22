import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/services/categoryService';

@Component({
  selector: 'app-categorias-admin',
  templateUrl: './categorias-admin.component.html',
  styleUrls: ['./categorias-admin.component.scss']
})
export class CategoriasAdminComponent implements OnInit {

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
        },
        error => {
          console.error('Error loading categories: ', error);
        }
      );
    }
  
    addCategory(category: Category) {
      this.categoryService.createCategory(category).subscribe(
        newCategory => {
          this.categories.push(newCategory);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully' });
        },
        error => {
          console.error('Error adding category: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding category' });
        }
      );
    }
  
    updateCategory(category: Category) {
      this.categoryService.updateCategory(category.id, category).subscribe(
        updatedCategory => {
          const index = this.categories.findIndex(c => c.id === updatedCategory.id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully' });
        },
        error => {
          console.error('Error updating category: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating category' });
        }
      );
    }
  
    deleteCategory(category: Category) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.categoryService.deleteCategory(category.id).subscribe(
          () => {
            this.categories = this.categories.filter(c => c.id !== category.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
          },
          (error:any) => {
            console.error('Error deleting category: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting category' });
          }
        );
      }
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

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Menu } from 'src/app/model/Menu';

import { MenuesService } from 'src/app/services/menues.service';

@Component({
  selector: 'app-menus-admin',
  templateUrl: './menus-admin.component.html',
  styleUrls: ['./menus-admin.component.scss']
})
export class MenusAdminComponent implements OnInit {
  menus: Menu[];
  selectedMenu: Menu;

  constructor(private menuService: MenuesService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.menuService.getAllMenus().subscribe(
        (menus) => {
        this.menus = menus;
      },
        (      error: any) => {
        console.error('Error loading menus: ', error);
      }
    );
  }

  addMenu(menu: Menu) {
    this.menuService.createMenu(menu).subscribe(
        (  newMenu) => {
        this.menus.push(newMenu);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Menu added successfully' });
      },
        (      error: any) => {
        console.error('Error adding menu: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding menu' });
      }
    );
  }

  updateMenu(menu: Menu) {
    this.menuService.updateMenu(menu.id, menu).subscribe(
        (      updatedMenu: Menu) => {
        const index = this.menus.findIndex(m => m.id === updatedMenu.id);
        if (index !== -1) {
          this.menus[index] = updatedMenu;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Menu updated successfully' });
      },
        (      error: any) => {
        console.error('Error updating menu: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating menu' });
      }
    );
  }

  deleteMenu(menu: Menu) {
    if (confirm('Are you sure you want to delete this menu?')) {
      this.menuService.deleteMenu(menu.id).subscribe(
        () => {
          this.menus = this.menus.filter(m => m.id !== menu.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Menu deleted successfully' });
        },
          (        error: any) => {
          console.error('Error deleting menu: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting menu' });
        }
      );
    }
  }

  selectMenu(menu: Menu) {
    this.selectedMenu = menu;
    this.messageService.add({ severity: 'info', summary: 'Menu Selected', detail: menu.name });
  }

  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Menu Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Menu Unselected', detail: event.data.name });
  }

  isRowSelectable(event: any) {
    return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data: any) {
    return data.inventoryStatus === 'OUTOFSTOCK';
  }

}

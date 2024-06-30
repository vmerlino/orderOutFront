import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/model/Menu';
import { MenuesService } from 'src/app/services/menues.service';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.scss']
})
export class MenuCreateComponent implements OnInit {
  private _menuSelect: Menu;
  accion = 'Agregar'
  nombre: string;
  descripcion: string;

  @Input() displayDialog: boolean = false;
  @Input() set menu(value: Menu) {
    this._menuSelect = value;
    if(value){
      this.accion='Modificar';
      this.nombre = value.name;
      this.descripcion = value.description;
    }   
  } 
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateCategories: EventEmitter<void> = new EventEmitter<void>();

  constructor(private menuService: MenuesService) { }

  ngOnInit(): void {
  }

  guardar() {
    this.menu = new Menu(1,  this.nombre,this.descripcion);
    this.menuService.createMenu(this.menu).subscribe({
      next: (response) => {
        console.log('Menu creado exitosamente', response);
        this.cerrarDialogo();
      },
      error: (error) => {
        console.error('Error al crear la menu', error);
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/model/Menu';
import { MenuesService } from 'src/app/services/menues.service';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.scss']
})
export class MenuCreateComponent implements OnInit {
  @Input() displayDialog: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() menu: Menu;

  accion = 'Agregar'
  nombre: string;
  descripcion: string;
  constructor(private menuService: MenuesService) { }

  ngOnInit(): void {
    if(this.menu){
      this.accion='Modificar';
    }
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

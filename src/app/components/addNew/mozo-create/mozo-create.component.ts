import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Waiter } from 'src/app/model/Waiter';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-mozo-create',
  templateUrl: './mozo-create.component.html',
  styleUrls: ['./mozo-create.component.scss']
})
export class MozoCreateComponent implements OnInit {
  _waiterSelect: Waiter;
  @Input() displayDialog: boolean = false;
  @Input() set waiter(value: Waiter) {
    this._waiterSelect = value;
    if(value){
      this.accion='Modificar';
      this.nombre = value.name;
    }   
  } 
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateCategories: EventEmitter<void> = new EventEmitter<void>();

  accion = 'Agregar'
  nombre: string;
  constructor(private waiterService: WaiterService) { }

  ngOnInit(): void {
    if(this.waiter){
      this.accion='Modificar';
    }
  }

  guardar() {
    this.waiter = new Waiter(null,  this.nombre);
    this.waiterService.createWaiter(this.waiter).subscribe({
      next: (response) => {
        console.log('Mozo creado exitosamente', response);
        this.cerrarDialogo();
      },
      error: (error) => {
        console.error('Error al crear el Mozo', error);
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

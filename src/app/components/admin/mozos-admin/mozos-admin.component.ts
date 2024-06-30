import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Waiter } from 'src/app/model/Waiter';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-mozos-admin',
  templateUrl: './mozos-admin.component.html',
  styleUrls: ['./mozos-admin.component.scss']
})
export class MozosAdminComponent implements OnInit {
    waiters: Waiter[];
    displayDialog = false;
    selectedWaiter: Waiter;
  
    constructor(private waiterService: WaiterService, private messageService: MessageService) {}
  
    ngOnInit() {
      this.loadWaiters();
    }
  
    loadWaiters() {
      this.waiterService.getAllWaiters().subscribe(
        waiters => {
          this.waiters = waiters;
          console.log(waiters);
        },
        error => {
          console.error('Error loading waiters: ', error);
        }
      );
    }
  
    addWaiter(waiter: Waiter) {
      this.waiterService.createWaiter(waiter).subscribe(
        newWaiter => {
          this.waiters.push(newWaiter);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Waiter added successfully' });
        },
        error => {
          console.error('Error adding waiter: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding waiter' });
        }
      );
    }
    cerrarDialogo() {
      this.displayDialog = false;
    }
    abrirDialogo() {
      this.displayDialog = true;
    }
    updateWaiter() {
      this.cerrarDialogo();
      this.loadWaiters();
    }
  
    deleteWaiter() {
        this.waiterService.deleteWaiter(this.selectedWaiter.id).subscribe(
          () => {
            this.waiters = this.waiters.filter(w => w.id !== this.selectedWaiter.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Waiter deleted successfully' });
          },
          error => {
            console.error('Error deleting waiter: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting waiter' });
          }
        );
      }
  
  
    selectWaiter(waiter: Waiter) {
      this.selectedWaiter = waiter;
      this.messageService.add({ severity: 'info', summary: 'Waiter Selected', detail: waiter.name });
    }
  
    onRowSelect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Waiter Selected', detail: event.data.name });
    }
  
    onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Waiter Unselected', detail: event.data.name });
    }
  
    isRowSelectable(event: any) {
      return !this.isOutOfStock(event.data);
    }
  
    isOutOfStock(data: any) {
      return data.inventoryStatus === 'OUTOFSTOCK';
    }
  
}

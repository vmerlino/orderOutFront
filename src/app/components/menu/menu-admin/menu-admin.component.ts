import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
   items!: MenuItem[];

  constructor(private messageService: MessageService,private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;

      this.items = [{
        label: 'Opciones',
        items: [
            {
                label: 'Productos',
                icon: 'pi pi-shopping-cart',
                routerLink: 'admin/productos'
            },
            {
                label: 'Menu',
                icon: 'pi pi-calendar',
                routerLink:'admin/menu'
            },
            {
                label: 'Categorias',
                icon: 'pi pi-bars',
                routerLink:'admin/categorias'
            },
            {
                label: 'Reservas',
                icon: 'pi pi-table',
                routerLink:'admin/reservas'
            },
            {
                label: 'Mozos',
                icon: 'pi pi-user',
                routerLink:'admin/mozos'
            },
            {
                label: 'Pedidos',
                icon: 'pi pi-shopping-cart',
                routerLink:'admin/pedidos'
            },
            {
                label: 'Cuentas',
                icon: 'pi pi-credit-card',
                routerLink:'admin/cuentas'
            },
            {
                label: 'Cerrar sesión',
                icon: 'pi pi-power-off',
                styleClass: 'move-to-end',
                command: () => {

                }
            }
        ],
    }
      ];
  }

}

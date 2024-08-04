import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Role } from 'src/app/model/Role';
import { logout } from 'src/app/states/Auth.actions';
import { UserLoggedIn } from 'src/app/states/Auth.reducer';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {
  items!: MenuItem[];

  constructor(
    private store: Store,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}
  MENU_ITEMS = {
    admin: [
      {
        label: 'Productos',
        icon: 'pi pi-shopping-cart',
        routerLink: 'admin/productos',
      },
      /*{
        label: 'Menu',
        icon: 'pi pi-calendar',
        routerLink: 'admin/menu',
      },*/
      {
        label: 'Categorias',
        icon: 'pi pi-bars',
        routerLink: 'admin/categorias',
      },
      /*{
        label: 'Reservas',
        icon: 'pi pi-table',
        routerLink: 'admin/reservas',
      },*/
      {
        label: 'Mozos',
        icon: 'pi pi-user',
        routerLink: 'admin/mozos',
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-shopping-cart',
        routerLink: 'admin/pedidos',
      },
      {
        label: 'Cuentas',
        icon: 'pi pi-credit-card',
        routerLink: 'admin/cuentas',
      },
      {
        label: 'Pagos',
        icon: 'pi pi-dollar',
        routerLink: 'admin/historial-pagos',
      },
      {
        label: 'Estadisticas',
        icon: 'pi pi-dollar',
        routerLink: 'admin/estadisticas-productos',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        styleClass: 'move-to-end',
        command: () => {
          this.store.dispatch(logout());
          this.router.navigate(['/login']);
        },
      },
    ],
    cocina: [
      {
        label: 'Pedidos',
        icon: 'pi pi-shopping-cart',
        routerLink: 'admin/pedidos',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        styleClass: 'move-to-end',
        command: () => {
          this.store.dispatch(logout());
          this.router.navigate(['/login']);
        },
      },
    ],
    mozo: [
      {
        label: 'Pedidos',
        icon: 'pi pi-shopping-cart',
        routerLink: 'admin/pedidos',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        styleClass: 'move-to-end',
        command: () => {
          this.store.dispatch(logout());
          this.router.navigate(['/login']);
        },
      },
    ],
  };

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.store.select(UserLoggedIn).subscribe((value) => {
      if (value) {
        if (this.hasRole(value.usersRoles, 'ADMIN')) {
          this.items = this.MENU_ITEMS['admin'];
        }else{ this.items =  this.MENU_ITEMS['cocina'];}
        /* else if (this.hasRole(value.userRoles, 'COCINA')) {
          this.items = this.MENU_ITEMS['cocina'];
        } else if (this.hasRole(value.userRoles, 'MOZO')) {
          this.items = this.MENU_ITEMS['mozo'];
        } else {
          this.items = [];
        }*/
      }
    });
  }
  hasRole(userRoles: Role[], roleName: string): boolean {
    return userRoles.some((role) => role.name === roleName);
  }
}

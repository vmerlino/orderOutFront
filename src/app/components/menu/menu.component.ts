import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  items2!: MenuItem[];

    constructor(private messageService: MessageService,private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
  
    this.items = [
      { icon: 'pi pi-fw pi-home', routerLink: '/catalogo' },
      { icon: 'pi pi-search', routerLink: '/search' },
      { icon: 'pi pi-shopping-cart', routerLink: '/cart',  badge: '5', styleClass: 'p-menuitem-cart' },
      { icon: 'pi pi-list', routerLink: '/pedidos' },
      { icon: 'pi pi-wallet', routerLink: '/wallet' },
      { icon: 'pi pi-question-circle', command: () => {
        window.open('https://docs.google.com/document/d/1OdVgBdk05uy4qvCcAC1MzSOpc3hIi-Gx/edit?usp=sharing&ouid=108635851454151287334&rtpof=true&sd=true', '_blank');
      }}
    ];
  }

}

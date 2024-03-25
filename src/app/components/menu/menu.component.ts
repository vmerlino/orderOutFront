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
      { icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { icon: 'pi pi-search', routerLink: '/search' },
      { icon: 'pi pi-shopping-cart', routerLink: '/cart' },
      { icon: 'pi pi-wallet', routerLink: '/wallet' },
    ];
  }

}

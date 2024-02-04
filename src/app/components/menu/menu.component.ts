import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  constructor() { }

  ngOnInit(): void {

    this.items = [
      {icon: 'pi pi-fw pi-home'},
      {icon: 'pi pi-search'},
      {icon: 'pi pi-shopping-cart'},
      {icon: 'pi pi-wallet'},
  ];
}
  }



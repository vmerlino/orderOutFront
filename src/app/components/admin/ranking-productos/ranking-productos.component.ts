import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';

@Component({
  selector: 'app-ranking-productos',
  templateUrl: './ranking-productos.component.html',
  styleUrls: ['./ranking-productos.component.scss']
})
export class RankingProductosComponent implements OnInit {
  @Input() bills: Account[];
  dataSource: any[] = [
    { nombre: 'Producto A', ventas: 100 },
    { nombre: 'Producto B', ventas: 150 },
    { nombre: 'Producto C', ventas: 200 }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
addToCart(_t53: any) {
throw new Error('Method not implemented.');
}
removeFromCart(_t53: any) {
throw new Error('Method not implemented.');
}

  products!: Product[];

  virtualProducts!: Product[];

  sortKey!: string;

  sortOptions!: SelectItem[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
    this.virtualProducts = Array.from({ length: 10 });

    this.sortOptions = [
      { label: 'Cheapest First', value: 'price' },
      { label: 'Expensive First', value: '!price' },
    ];
  }

  loadCarsLazy(event: LazyLoadEvent | undefined) {
    // simulate remote connection with a timeout
      if(event != undefined && event.first != undefined && event.rows != undefined){
      //load data of required page
      let loadedProducts = this.products.slice(
        event.first,
        event.first + event.rows
      );
console.log('entra aca')
console.log(loadedProducts)
      //populate page of virtual cars
      this.virtualProducts.splice(event.first, event.rows, ...loadedProducts);


      //trigger change detection
//      event.forceUpdate();
      }
  }

  onSortChange() {
    if (this.sortKey.indexOf('!') === 0) this.sort(-1);
    else this.sort(1);
  }

  sort(order: number): void {
    let products = [...this.products];
    //products.sort((data1, data2) => {
      //let value1 = data1.price;
      //let value2 = data2.price;
      //let result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      //return order * result;
    //});

    this.products = products;
  }
}

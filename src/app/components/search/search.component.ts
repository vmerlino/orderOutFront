import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualScroller } from 'primeng/virtualscroller';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('virtualScroller') virtualScroller: VirtualScroller;

addToCart(_t9: any) {
throw new Error('Method not implemented.');
}
removeFromCart(_t9: any) {
throw new Error('Method not implemented.');
}
  filteredProducts: Product[];
  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  filterProducts(event: any |  null) {
        console.log(event.target.value);
        let searchTerm = event.target.value;
        if(searchTerm != null && searchTerm != ''){
        this.filteredProducts = this.products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase())
          }
        );
        this.virtualScroller?.scrollToIndex(0);
        }else{
          this.filteredProducts= [];
        this.ngOnInit();
      }
  }

  categories: Category[] = [
    { id: 1, name: 'pizza' },
    { id: 2, name: 'bebidas' },
    { id: 3, name: 'hamburguesa' },
  ];
  
  

}

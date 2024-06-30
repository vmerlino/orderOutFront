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
   /* this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = this.products;
    });*/
    this.products = [
      {
        id: 1,
        name: 'Coca-Cola',
        description: 'Carbonated soft drink',
        imageUrl: 'https://example.com/coca-cola.jpg',
        isVegan: true,
        isGlutenFree: true,
        price: 1.99,
        category: this.categories[0],
      },
      {
        id: 2,
        name: 'Gluten-Free Chips',
        description: 'Crispy and delicious chips',
        imageUrl: 'https://example.com/gluten-free-chips.jpg',
        isVegan: true,
        isGlutenFree: true,
        price: 2.49,
        category: this.categories[1],
      },
      {
        id: 3,
        name: 'Vegan Brownie',
        description: 'Delicious and moist brownie',
        imageUrl: 'https://example.com/vegan-brownie.jpg',
        isVegan: true,
        isGlutenFree: false,
        price: 3.49,
        category: this.categories[2],
      },
      {
        id: 4,
        name: 'Regular Chips',
        description: 'Crunchy potato chips',
        imageUrl: 'https://example.com/regular-chips.jpg',
        isVegan: false,
        isGlutenFree: true,
        price: 1.99,
        category: this.categories[1],
      },
      {
        id: 5,
        name: 'Ice Cream',
        description: 'Vanilla ice cream',
        imageUrl: 'https://example.com/ice-cream.jpg',
        isVegan: false,
        isGlutenFree: false,
        price: 2.99,
        category: this.categories[2],
      },
    ];
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

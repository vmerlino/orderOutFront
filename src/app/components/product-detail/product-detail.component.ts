import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/Product';
import { updateClarification } from 'src/app/states/CarritoState.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productQuantity: any;
  clarification: string;

  constructor(private route: ActivatedRoute, private store : Store) { }

  ngOnInit(): void {

    this.productQuantity = history.state.product;
    console.log(this.productQuantity)
  }
  changeClarification(){
          console.log(this.clarification)

    if(this.clarification != ""){
      console.log(this.clarification)
      this.store.dispatch(updateClarification({ productId: this.productQuantity.product.id,clarification: this.clarification  }));

    }
  }
}

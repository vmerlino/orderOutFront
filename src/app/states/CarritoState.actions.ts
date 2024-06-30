import { createAction, props } from '@ngrx/store';
import { Product } from '../model/Product';

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());
export const removeProduct = createAction('[Product] Remove Product', props<{ product: Product }>());
export const clearCart = createAction('[Carrito] Clear Cart');

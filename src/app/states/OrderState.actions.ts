// src/store/actions/ordersActions.ts
import { createAction, props } from '@ngrx/store';
import { Order } from '../model/Order';

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Order }>()
);

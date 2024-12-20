// src/store/actions/ordersActions.ts
import { createAction, props } from '@ngrx/store';
import { Order } from '../model/Order';

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Order[] }>()
);
export const clearOrders = createAction(
  '[Order] Clear Orders' // Nueva acción para limpiar las órdenes
);
export const lanzarmensaje = createAction('[Order] Lanzar Mensaje');


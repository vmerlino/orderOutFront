import { createAction, props } from '@ngrx/store';

export const requestWaiter = createAction(
  '[Catalogo] Request Waiter',
  props<{ tableNumber: number }>()
);

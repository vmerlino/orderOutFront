import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '../model/Order';
import { addOrder, clearOrders, lanzarmensaje } from './OrderState.actions'; // Importa la nueva acción
import { localStorageSyncOrdersReducer } from './localStorageOrder.reducer';

export interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: JSON.parse(localStorage.getItem('ordersState') || "null") != null ? JSON.parse(localStorage.getItem('ordersState')!) : [],
};

export const _ordersReducer = createReducer(
  initialState,
  on(addOrder, (state, { order }) => ({
    ...state,
    orders: [...state.orders, ...order],
  })),
  on(clearOrders, state => ({
    ...state,
    orders: [] // Limpia el arreglo de órdenes
  })),
  on(lanzarmensaje, state => ({
    ...state // No hacemos nada aquí, el efecto se encargará del mensaje
  }))
);

export function ordersReducer(state: OrdersState | undefined, action: Action) {
  return _ordersReducer(state, action);
}

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.orders
);

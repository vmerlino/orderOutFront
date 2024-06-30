import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '../model/Order';
import { addOrder } from './OrderState.actions';


export interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const _ordersReducer = createReducer(
  initialState,
  on(addOrder, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
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

import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { carritoReducer } from './CarritoState.reducer';
import { _ordersReducer } from './OrderState.reducer';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);
    if (action.type === '[User] login' || action.type === '[User] logout') {
      localStorage.setItem('authState', JSON.stringify(nextState));
    }

     const nextState2 = carritoReducer(state, action);
     const nextState3 = _ordersReducer( state,action);
     if (action.type === '[Order] Add Order') {
      localStorage.setItem('ordersState', JSON.stringify(nextState3.orders));
    }
    if (action.type === '[Product] Add Product' || action.type === '[Product] Remove Product' || action.type === '[Cart] Update Clarification') {
      localStorage.setItem('cartState', JSON.stringify(nextState2));
    }
    if(action.type === '[Carrito] Clear Cart'){
      localStorage.setItem('cartState', JSON.stringify([]));

    }
    
 // Recuperar el estado desde `localStorage` al iniciar la app


}
}

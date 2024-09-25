import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { ordersReducer, OrdersState } from './OrderState.reducer';

// Función para sincronizar el estado de órdenes con `localStorage`
export function localStorageSyncOrdersReducer(
  reducer: ActionReducer<OrdersState>
): ActionReducer<OrdersState> {
  return (state, action) => {
    // Recuperar el estado desde `localStorage` al iniciar la app
    if (action.type === INIT || action.type === UPDATE) {
      const savedOrdersState = localStorage.getItem('ordersState');
      state = {
        ...state,
        orders: savedOrdersState ? JSON.parse(savedOrdersState) : state!.orders,
      };
    }

    // Obtener el siguiente estado del reducer
    const nextState = ordersReducer(state, action);

    // Guardar el estado en `localStorage` cuando hay un cambio
    if (action.type === '[Order] Add Order') {
      localStorage.setItem('ordersState', JSON.stringify(nextState.orders));
    }

    return nextState;
  };
}

import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { requestWaiter } from './Notifications.actions';

export interface NotificationsState {
  notifiedTables: Set<number>;
}

export const initialState: NotificationsState = {
  notifiedTables: new Set<number>(),
};
export const selectNotificationsState = createFeatureSelector<NotificationsState>('notifications');
export const selectNotifiedTables = createSelector(
    selectNotificationsState,
    (state: NotificationsState) => state.notifiedTables
  );
const _notificationsReducer = createReducer(
    initialState,
    on(requestWaiter, (state, { tableNumber }) => ({
        ...state,
        notifiedTables: new Set(state.notifiedTables).add(tableNumber),
    }))
);

export function notificationsReducer(state: NotificationsState | undefined, action: Action) {
  return _notificationsReducer(state, action);
}
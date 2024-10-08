import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../model/User';
import { login, logout, setUser } from './Auth.actions';
import { Action } from '@ngrx/store';
import { localStorageSyncReducer } from './LocalStorageSyncReducer';

export interface UserState {
  user: User | null;
  loggedIn: boolean;
}

export const initialState: UserState = {
  user: null,
  loggedIn: false,
};

const userReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({
    ...state,
    user,
    loggedIn: true,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    loggedIn: false,
  })),
  on(setUser, (state, { user }) => ({
    ...state,
    user: user as unknown as User,
    loggedIn: false, // Ajusta según tu lógica
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return localStorageSyncReducer(userReducer)(state, action);
}

// Selectors
export const selectOrdersState = createFeatureSelector<UserState>('user');

export const loggedIn = createSelector(
  selectOrdersState,
  (state: UserState) => state?.loggedIn
);

export const selectUserState = createFeatureSelector<UserState>('user');

export const UserLoggedIn = createSelector(
  selectUserState,
  (state: UserState) => state?.user
);

export const selectLoggedIn = (state: UserState) => state.loggedIn;
export const selectUser = (state: UserState) => state.user;

import { createReducer, on } from '@ngrx/store';
import { User } from '../model/User';
import { login, logout, setUser } from './Auth.actions';
import { Action } from '@ngrx/store';

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

  on(logout, (state, { user }) => ({
    ...state,
    user: null,
    loggedIn: false,
  })),

  on(setUser, (state, { user }) => ({
    ...state,
    user: user as unknown as User,
    loggedIn: true, // Depending on your logic
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

export const selectLoggedIn = (state: UserState) => state.loggedIn;
export const selectUser = (state: UserState) => state.user;

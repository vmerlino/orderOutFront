import { Action, createAction, props } from '@ngrx/store';
import { User } from '../model/User';


export const login = createAction('[User] login', props<{ user: User }>());
export const logout = createAction('[User] logout', props<{ user: User }>());
export const setUser = createAction('[String] set user', props<{ user: String }>());

import { createAction, props } from '@ngrx/store';
import { Product } from '../model/Product';
import { Table } from '../model/Table';


export const setTable = createAction('[Table] set table', props<{ table: Table }>());
export const getTable = createAction('[Table] get table');
export const clearTable = createAction('[Table] Clear Table');

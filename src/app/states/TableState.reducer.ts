import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Table } from "../model/Table";
import { clearTable, setTable } from "./TableState.actions";
import { Waiter } from "../model/Waiter";

export interface TableState {
  table: Table | null;
}

const initialState: TableState = {
  table: new Table(2,9,new Waiter(1,"maria"),"libre")
};

const _tableReducer = createReducer(
  initialState,
  on(setTable, (state, { table }) => {
    return {
      ...state,
      table: table
    };
  }),
  on(clearTable, state => {
    return {
      ...state,
      table: null
    };
  })
);

export function tableReducer(state: TableState | undefined, action: Action) {
  return _tableReducer(state, action);
}

export const selectTableState = createFeatureSelector<TableState>("table");

export const selectTable = createSelector(
  selectTableState,
  (state: TableState) => state.table
);


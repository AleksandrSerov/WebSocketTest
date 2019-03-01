import { createAction } from "redux-actions";

export const setInitialState = createAction("INITIAL_STATE/SET");

export const fetchRequest = createAction("FETCH/REQUEST");
export const fetchSuccess = createAction("FETCH/SUCCESS");
export const fetchFailure = createAction("FETCH/FAILURE");

import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import actions from "../actions";

const initialState = {
  messages: [],
  rooms: [],
  ui: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actions.setInitialState:
      return state;
    default:
      return state;
  }
}

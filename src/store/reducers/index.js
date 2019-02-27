import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import actions from "../actions";
const initialState = {
  messages: [],
  rooms: [],
  ui: {}
};

export const initial = handleActions(
  {
    [actions.setInitialState](state = initialState, { payload }) {
      return state;
    }
  },
  {}
);

export default combineReducers({
  initial
});

import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import actions from "../actions";

export const messages = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.messages;
    }
  },
  []
);

export const rooms = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.rooms;
    }
  },
  []
);

export const ui = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.ui;
    }
  },
  {}
);

export default combineReducers({ messages, rooms, ui });

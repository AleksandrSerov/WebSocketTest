import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import actions from "../actions";

export const messages = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.messages;
    },
    [actions.updateSettingsMessages](state, { payload }) {
      const message = {
        room: "settings",
        data: payload.settings,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateOrdersMessages](state, { payload }) {
      const message = {
        room: payload.room,
        data: payload.orders,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateOrderRoomMessage](state, { payload }) {
      const message = {
        room: "order",
        data: payload.order,
        timestamp: payload.timestamp
      };
      return [...state, message];
    }
  },
  []
);

export const rooms = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.rooms;
    },
    [actions.updateRooms](state, { payload }) {
      return [...state, payload];
    }
  },
  []
);

export const ui = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.ui;
    },
    [actions.setCurrentRoom](state, { payload }) {
      return { ...state, currentRoom: payload };
    }
  },
  {}
);

export default combineReducers({ messages, rooms, ui });

import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import actions from "../actions";

export const messages = handleActions(
  {
    [actions.setInitialState](state, { payload }) {
      return payload.messages;
    },
    [actions.updateSettingsMessages](state, { payload }) {
      console.log("updateSettingsRoomMessage: ", payload);

      const message = {
        room: "settings",
        data: payload.settings,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateOrderRoomMessage](state, { payload }) {
      console.log("updateOrderRoomMessage: ", payload);
      const message = {
        room: "order",
        data:
          payload.districts ||
          payload.categories ||
          payload.routes ||
          payload.couriers,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateMessageRoomMessage](state, { payload }) {
      console.log("updateMessageRoomMessage: ", payload);

      const message = {
        room: "message",
        data: payload.message,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateLogonRoomMessage](state, { payload }) {
      console.log("updateMessageRoomMessage: ", payload);

      const message = {
        room: "logon",
        data: payload.act,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateOrdersMessages](state, { payload }) {
      console.log("updateOrdersMessage: ", payload);

      const message = {
        room: "orders",
        data: payload.orders,
        timestamp: payload.timestamp
      };
      return [...state, message];
    },
    [actions.updateCouriersRoomMessage](state, { payload }) {
      console.log("updateCouriersRoomMessage: ", payload);

      const message = {
        room: "couriers",
        data: payload,
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
    },
    [actions.leaveRoom](state, { payload }) {
      const rooms = state.reduce((acc, item) => {
        if (item !== payload) {
          return [...acc, item];
        }
        return acc;
      }, []);
      return rooms;
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

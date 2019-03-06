import { createAction } from "redux-actions";

export const setInitialState = createAction("INITIAL_STATE/SET");

export const fetchRequest = createAction("FETCH/REQUEST");
export const fetchSuccess = createAction("FETCH/SUCCESS");
export const fetchFailure = createAction("FETCH/FAILURE");

//Update messages
export const updateSettingsMessages = createAction("SETTINGS_MESSAGE/UPDATE");
export const updateOrdersMessages = createAction("ORDERS_MESSAGE/UPDATE");
export const updateRooms = createAction("ROOMS/UPDATE");
export const setCurrentRoom = createAction("CURRENT_ROOM/SET");
export const updateOrderRoomMessage = createAction("ORDER_ROOM_MESSAGE/UPDATE");
export const updateMessageRoomMessage = createAction("MESSAGE_ROOM/UPDATE");
export const updateLogonRoomMessage = createAction("MESSAGE_LOGON/UPDATE");
export const updateCouriersRoomMessage = createAction(
  "MESSAGE_COURIERS/UPDATE"
);

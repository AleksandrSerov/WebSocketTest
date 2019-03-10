import { createAction } from "redux-actions";
//Initial state
export const setInitialState = createAction("INITIAL_STATE/SET");

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

// Leave Rooms
export const leaveRoom = createAction("ROOM/LEAVE");

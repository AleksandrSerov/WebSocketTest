import actions from "../../actions";

export const handleSettingsRoomsMessage = data => async dispatch => {
  dispatch(actions.updateSettingsMessages(data));
};

export const handleOrdersMessage = data => async dispatch => {
  dispatch(actions.updateOrdersMessages(data));
};

export const handleOrderRoomMessage = data => async dispatch => {
  dispatch(actions.updateOrderRoomMessage(data));
};

export const handleMessageRoomMessage = data => async dispatch => {
  dispatch(actions.updateMessageRoomMessage(data));
};

export const handleLogonRoomMessage = data => async dispatch => {
  dispatch(actions.updateLogonRoomMessage(data));
};

export const handleCouriersRoomMessage = data => async dispatch => {
  dispatch(actions.updateCouriersRoomMessage(data));
};

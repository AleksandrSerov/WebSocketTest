import actions from "../../actions";

export const handleSocketOpen = data => (dispatch, getState) => {
  try {
    console.log("this");
    dispatch(actions.fetchRequest());
  } catch (error) {
    console.log(`Error while handling initial request: ${error}`);
  }
};

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
  dispatch(actions.updateOrderRoomMessage(data));
};

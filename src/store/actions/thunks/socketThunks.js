import actions from "../../actions";
console.log(actions);
export const handleSettingsRoomMessage = data => async (dispatch, getState) => {
  try {
    console.log(getState());
    dispatch(actions.setInitialState());
  } catch (error) {
    console.log(error);
  }
};

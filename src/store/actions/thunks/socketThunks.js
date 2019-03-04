import actions from "../../actions";

export const handleSocketOpen = data => (dispatch, getState) => {
  try {
    console.log("this");
    dispatch(actions.fetchRequest());
  } catch (error) {
    console.log(`Error while handling initial request: ${error}`);
  }
};

export const handleSettingsRoomsMessage = data => {
  console.log({...data});
  // const { messages, rooms, ui } = getState();
  // console.log({ messages, rooms, ui });
};

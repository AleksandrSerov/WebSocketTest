const joinCommonRooms = (socket, room, actions, dispatch) => {
  switch (room) {
    case "settings":
      socket.join("settings").on({
        room: "settings",
        cb: msg => {
          dispatch(actions.handleSettingsRoomsMessage(msg));
        }
      });
      break;

    case "order":
      socket.join("order").on({
        room: "order",
        cb: msg => {
          dispatch(actions.handleOrderRoomMessage(msg));
        }
      });
      break;

    case "message":
      socket.join("message").on({
        room: "message",
        cb: msg => {
          dispatch(actions.handleMessageRoomMessage(msg));
        }
      });
      break;

    case "logon":
      socket.join("logon").on({
        room: "logon",
        cb: msg => {
          dispatch(actions.handleLogonRoomMessage(msg));
        }
      });
      break;
    default:
      break;
  }
};

export default joinCommonRooms;

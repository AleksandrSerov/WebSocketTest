const joinSettingsRoom = (socket, actions) => {
  socket.join("settings").on({
    room: "settings",
    cb: msg => {
      actions.handleSettingsRoomMessage(msg);
    }
  });
};
export default joinSettingsRoom;

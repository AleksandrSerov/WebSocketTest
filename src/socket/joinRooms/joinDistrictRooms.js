const joinDistrictRooms = (
  socket,
  room,
  actions,
  dispatch,
  districtId,
  prevDistrictId
) => {
  switch (room) {
    case `order.district_${districtId}`:
      socket.leave(`order.district_${prevDistrictId}`);
      dispatch(actions.leaveRoom(`order.district_${prevDistrictId}`));
      socket.join(`order.district_${districtId}`).on({
        room: `order.district_${districtId}`,
        cb: msg => {
          dispatch(actions.handleOrdersMessage(msg));
        }
      });
      break;

    case `courier.district_${districtId}`:
      socket.leave(`courier.district_${prevDistrictId}`);
      socket.join(`courier.district_${districtId}`).on({
        room: `courier.district_${districtId}`,
        cb: msg => {
          dispatch(actions.handleCouriersRoomMessage(msg));
        }
      });
      break;

    default:
      break;
  }
};

export default joinDistrictRooms;

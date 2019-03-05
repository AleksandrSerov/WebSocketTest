import React, { Component } from "react";
import SocketClient from "../../services/socketClient/SocketClient";
import "./form.css";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { Button, Input } from "reactstrap";
class Form extends Component {
  state = {
    url: "",
    token: "",
    room: ""
  };
  handleInput = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleConnect = event => {
    event.preventDefault();
    const { token } = this.state;

    this.socket = new SocketClient();
    this.socket
      .on({
        event: "open",
        cb: actions.handleSocketOpen
      })
      .on({ event: "connect", cb: actions.setSocketConnected });
    this.socket.open(token);
  };

  handleJoinRoom = () => {
    const { dispatch, rooms } = this.props;
    const { room } = this.state;
    dispatch(actions.setCurrentRoom(room));
    if (!rooms.includes(room)) {
      dispatch(actions.updateRooms(room));
    }
    const districtNum = /order.district_/.test(room)
      ? room.replace(/\D/gi, "")
      : null;
    switch (room) {
      case "settings":
        this.socket.join("settings").on({
          room: "settings",
          cb: msg => {
            dispatch(actions.handleSettingsRoomsMessage(msg));
          }
        });
        break;
      case "order":
        this.socket.join("order").on({
          room: "order",
          cb: msg => {
            dispatch(actions.handleOrderRoomMessage(msg));
          }
        });
        break;
      case `order.district_${districtNum}`:
        this.socket.join(`order.district_${districtNum}`).on({
          room: `order.district_${districtNum}`,
          cb: msg => {
            dispatch(actions.handleOrdersMessage(msg));
          }
        });
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div className="content-form">
        <form action="#">
          <label htmlFor="url">URL</label>
          <Input id="url" name="url" onChange={this.handleInput} />
          <label htmlFor="token">Token</label>
          <Input id="token" name="token" onChange={this.handleInput} />
          <Button onClick={this.handleConnect}>Connect</Button>
          <div>
            <label htmlFor="room">Room</label>
            <Input id="room" name="room" onChange={this.handleInput} />
            <Button onClick={this.handleJoinRoom}>Join Room</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  };
};

const mapDispatchtoProps = dispatch => ({ dispatch });
export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Form);

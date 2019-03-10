import React, { Component } from "react";
import SocketClient from "../../services/socketClient/SocketClient";
import actions from "../../store/actions";
import joinCommonRooms from "../../socket/joinRooms/joinCommonRooms";
import joinDistrictRooms from "../../socket/joinRooms/joinDistrictRooms";
import { connect } from "react-redux";
import { Button, Input, Label } from "reactstrap";
import "./Form.css";
class Form extends Component {
  state = {
    token: "",
    selectedRooms: [],
    districtId: ""
  };
  handleInput = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAddRooms = event => {
    const selectedRooms = Array.from(event.target.options).reduce(
      (acc, item) => {
        return item.selected ? [...acc, item.value] : acc;
      },
      []
    );
    this.setState({
      selectedRooms
    });
  };

  handleConnect = () => {
    const { token } = this.state;
    this.socket = new SocketClient();
    this.socket.open(token);
  };

  handleJoinRoom = () => {
    const { dispatch, rooms } = this.props;
    const { selectedRooms, districtId } = this.state;

    const roomWitchPrevId = rooms.find(item => {
      return /_/.test(item);
    });
    const prevDistrictId = roomWitchPrevId
      ? roomWitchPrevId.slice(
          roomWitchPrevId.indexOf("_") + 1,
          roomWitchPrevId.length
        )
      : undefined;

    selectedRooms.forEach(selectedRoom => {
      selectedRoom = /\./.test(selectedRoom)
        ? selectedRoom + `_${districtId}`
        : selectedRoom;
      if (!rooms.includes(selectedRoom)) {
        dispatch(actions.updateRooms(selectedRoom));
      }
      joinCommonRooms(this.socket, selectedRoom, actions, dispatch);
      joinDistrictRooms(
        this.socket,
        selectedRoom,
        actions,
        dispatch,
        districtId,
        prevDistrictId
      );
    });
    dispatch(actions.setCurrentRoom(selectedRooms[0]));
  };

  render() {
    return (
      <div className="form">
        <form action="#" className="form-form">
          <label htmlFor="token">Token</label>
          <Input
            className="form-form-input"
            id="token"
            name="token"
            onChange={this.handleInput}
          />
          <Button onClick={this.handleConnect}>Connect</Button>
          <div>
            <Label for="districtId">District ID</Label>
            <Input
              id="districtId"
              name="districtId"
              className="form-form-input"
              onChange={this.handleInput}
            />
          </div>
          <div className="form-form-rooms">
            <div>Rooms</div>
            <select
              name="rooms"
              multiple="multiple"
              size="11"
              onChange={this.handleAddRooms}
              className="form-form-rooms-select"
            >
              <option defaultValue="logon" value="logon">
                logon{" "}
              </option>
              <option defaultValue="message" value="message">
                message{" "}
              </option>
              <option defaultValue="order" value="order">
                order{" "}
              </option>
              <option defaultValue="settings" value="settings">
                settings{" "}
              </option>
              <option defaultValue="order.district" value="order.district">
                order.district{" "}
              </option>
              <option defaultValue="courier.district" value="courier.district">
                courier.district{" "}
              </option>
              <option defaultValue="cheque.district" value="cheque.district">
                cheque.district{" "}
              </option>
              <option defaultValue="route.district" value="route.district">
                route.district{" "}
              </option>
            </select>
          </div>
          <Button onClick={this.handleJoinRoom}>Join Rooms</Button>
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

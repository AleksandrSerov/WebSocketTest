import React, { Component } from "react";
import SocketClient from "../../services/socketClient/SocketClient";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { Button, Input, FormGroup, Label } from "reactstrap";
import "./Form.css";
class Form extends Component {
  state = {
    // url: "",
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
    const { checked, name } = event.target;
    const { selectedRooms } = this.state;
    const update = checked
      ? [...selectedRooms, name]
      : selectedRooms.filter(item => item !== name);
    console.log(update);
    this.setState({
      selectedRooms: update
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
    const { selectedRooms, districtId } = this.state;
    selectedRooms.forEach(selectedRoom => {
      selectedRoom = /order.district/.test(selectedRoom)
        ? selectedRoom + `_${districtId}`
        : selectedRoom;
      if (!rooms.includes(selectedRoom)) {
        dispatch(actions.updateRooms(selectedRoom));
      }

      switch (selectedRoom) {
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
        case `order.district_${districtId}`:
          console.log(`order.district_${districtId}`);
          this.socket.join(`order.district_${districtId}`).on({
            room: `order.district_${districtId}`,
            cb: msg => {
              dispatch(actions.handleOrdersMessage(msg));
            }
          });
          break;

        default:
          break;
      }
    });
    dispatch(actions.setCurrentRoom(selectedRooms[0]));
  };

  render() {
    return (
      <div className="form">
        <form action="#" className="form-form">
          {/* <label htmlFor="url">URL</label> */}
          {/* <Input id="url" name="url" onChange={this.handleInput} /> */}
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
          <div className="form-form-checkbox">
            <Label>Rooms</Label>
            <FormGroup check>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="logon"
                  id="logon"
                  onChange={this.handleAddRooms}
                />
                <Label for="logon" check>
                  logon
                </Label>
              </div>

              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="message"
                  id="message"
                  onChange={this.handleAddRooms}
                />
                <Label for="message" check onChange={this.handleInput}>
                  message
                </Label>
              </div>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="order"
                  id="order"
                  onChange={this.handleAddRooms}
                />
                <Label for="order" check>
                  order
                </Label>
              </div>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="settings"
                  id="settings"
                  onChange={this.handleAddRooms}
                />
                <Label for="settings" check>
                  settings
                </Label>
              </div>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="order.district"
                  id="order.district"
                  onChange={this.handleAddRooms}
                />
                <Label for="order.district" check>
                  order.district_
                </Label>
              </div>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="couriers.district"
                  id="couriers.district"
                  onChange={this.handleAddRooms}
                />
                <Label for="couriers.district" check>
                  couriers.district_
                </Label>
              </div>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="route.district"
                  id="route.district"
                  onChange={this.handleAddRooms}
                />
                <Label for="route.district" check>
                  route.district_
                </Label>
              </div>
              <div className="form-form-checkbox-item">
                <Input
                  type="checkbox"
                  name="cheque.district"
                  id="cheque.district"
                  onChange={this.handleAddRooms}
                />
                <Label for="cheque.district" check>
                  cheque.district_
                </Label>
              </div>
            </FormGroup>
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

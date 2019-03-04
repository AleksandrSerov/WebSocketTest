import React, { Component } from "react";
import SocketClient from "../../services/socketClient/SocketClient";
import "./form.css";

class Form extends Component {
  constructor() {
    super();
  }
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
    this.socket.open(token);
  };
  handleJoinRoom = () => {
    const { room } = this.state;
    this.socket.join(room);
  };

  render() {
    return (
      <div className="content-form">
        <form action="#">
          <label htmlFor="url">URL</label>
          <input id="url" name="url" onChange={this.handleInput} />
          <label htmlFor="token">Token</label>
          <input id="token" name="token" onChange={this.handleInput} />
          <button type="submit" onClick={this.handleConnect}>
            Connect
          </button>
          <label htmlFor="room">Room</label>
          <input id="room" name="room" onChange={this.handleInput} />
        </form>
        <button onClick={this.handleJoinRoom}>Join Room</button>
      </div>
    );
  }
}

export default Form;

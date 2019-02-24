import React, { Component } from "react";
import "./App.css";
import SocketClient from "./service/socketClient";

class App extends Component {
  socket = new SocketClient();
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

  handleSubmit = event => {
    event.preventDefault();
    const {
      state: { token, room },
      socket
    } = this;

    socket.open(token);
    setTimeout(() => {
      this.socket.join(`${room}`);
    }, 15000);
  };

  render() {
    return (
      <div className="App">
        <h1>WebSocket App</h1>
        <div className="content">
          <div className="content-form">
            <form action="#">
              <label htmlFor="url">URL</label>
              <input onChange={this.handleInput} id="url" name="url" />

              <label htmlFor="token">Token</label>
              <input onChange={this.handleInput} id="token" name="token" />

              <label htmlFor="room">Room</label>
              <input onChange={this.handleInput} id="room" name="room" />

              <button type="submit" onClick={this.handleSubmit}>
                Add
              </button>
            </form>
          </div>
          <div className="socketList">
            <div className="socketList-counter" />
            <ul>
              <li>socket 1</li>
              <li>socket 1</li>
              <li>socket 1</li>
              <li>socket 1</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

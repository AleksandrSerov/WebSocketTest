import React, { Component } from "react";
import "./App.css";
import SocketClient from "./service/socketClient";

import uuidv1 from "uuid/v1";
import qs from "qs";
class App extends Component {
  constructor() {
    super();
    this.client_id = uuidv1();
    this.url = "wss://test.devpizzasoft.ru/socket.io/";
  }
  // socket = new SocketClient();
  state = {
    url: "",
    token: "",
    room: "",
    items: "",
    sockets: "",
    showList: true
  };
  ping = () => {
    this.socket.send(JSON.stringify({ type: "ping", data: "ping" }));
  };
  join = room => {
    this.socket.send(JSON.stringify({ type: "join", room }));
  };
  handleInput = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { token } = this.state;

    const query = {
      token,
      client_id: this.client_id,
      room: ""
    };

    this.socket = new WebSocket(`${this.url}?${qs.stringify(query)}`);

    setTimeout(() => {
      this.ping();
      this.join(this.state.room);
    }, 5000);

    this.socket.onmessage = request => {
      const message = JSON.parse(request.data);
      if (message.room === this.state.room) {
        this.setState({
          sockets: [...this.state.sockets, message]
        });
      }
    };
  };

  renderItems = arr => {
    const items = arr.map((item, i) => {
      return <li key={i}>{JSON.stringify(item.data)}</li>;
    });
    return (
      <>
        <span className="roomName">Room: {arr[0].room}</span>
        {items}
      </>
    );
  };
  showList = () => {
    this.setState({
      showList: !this.state.showList
    });
  };

  render() {
    const { sockets, showList } = this.state;
    const items = sockets ? this.renderItems(sockets) : "";
    const count = sockets.length;

    const list = showList ? (
      <ul onClick={this.showList} className="socketList list">
        {items}
      </ul>
    ) : (
      <ul onClick={this.showList} className="socketList list">
        <span className="roomName">Room: {sockets[0].room}</span>
      </ul>
    );
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
            <div className="socketList-counter">Count of sockets: {count}</div>
            {list}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

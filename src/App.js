import React, { Component } from "react";
import "./App.css";
import SocketTable from "./containers/SocketTable";
class App extends Component {
  // constructor() {
  //   super();
  //   this.client_id = uuidv1();
  //   this.url = "wss://test.devpizzasoft.ru/socket.io/";
  //   this.socket = null;
  // }
  // socket = new SocketClient();
  state = {
    url: "",
    token: "",
    room: "",
    rooms: [],
    connect: false
  };

  // ping = () => {
  //   this.socket.send(JSON.stringify({ type: "ping", data: "ping" }));
  // };

  // join = room => {
  //   const { rooms } = this.state;
  //   this.socket.send(JSON.stringify({ type: "join", room }));
  //   this.setState({
  //     rooms: [...rooms, room]
  //   });
  // };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleConnect = event => {
  //   event.preventDefault();
  //   const { token } = this.state;

  //   const query = {
  //     token,
  //     client_id: this.client_id,
  //     room: ""
  //   };
  //   this.socket = new WebSocket(`${this.url}?${qs.stringify(query)}`);

  //   setTimeout(() => {
  //     this.ping();
  //   }, 5000);

  //   this.socket.onmessage = request => {
  //     const { data, rooms } = this.state;
  //     const message = JSON.parse(request.data);

  //     if (rooms.includes(message.room)) {
  //       this.setState({
  //         data: [...data, { room: message.room, data: message.data }]
  //       });
  //     }
  //     if (message.pong) {
  //       this.setState({
  //         connect: true
  //       });
  //     }
  //     if (message.error) {
  //       alert("Error");
  //     }
  //   };
  // };

  // handleJoin = event => {
  //   event.preventDefault();
  //   this.join(this.state.room);
  // };

  render() {
    // const { data, rooms, connect } = this.state;
    // const status = connect ? "connect" : "disconnect";
    // const count = data.length;

    return (
      <div className="App">
        <h1>WebSocket App</h1>
        <div className="content">
          <div className="content-form">
            <form action="#">
              <label htmlFor="url">URL</label>
              <input id="url" name="url" onChange={this.handleInput} />
              <label htmlFor="token">Token</label>
              <input id="token" name="token" onChange={this.handleInput} />
              <button type="submit">Connect</button>
              <label htmlFor="room">Room</label>
              <input id="room" name="room" onChange={this.handleInput} />
            </form>
            <button>Join Room</button>
          </div>
          <div className="socketList">
            <div className="socketList-counter">Count of sockets:</div>
            <SocketTable />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

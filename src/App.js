import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    url: "",
    token: "",
    room: ""
  };
  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.state);
  }
  showSocket = () => {};

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    const { url, token, room } = this.state;
    const CLIENT_ID = "1f057240-36b2-11e9-a428-03d9d209efc5";
    event.preventDefault();
    const query = `${url}?token=${token}&client_id=${CLIENT_ID}&room=`;
    console.log(query);
    const socket = new WebSocket(query);
    socket.onopen = () => {
      console.log("Connected");
    };
    socket.onclose = event => {
      if (event.wasClean) {
        console.log(`Соединение закрыто чисто. Код закрытия -  ${event.code}`);
      } else {
        console.log("Обрыв соединения");
      }
      console.log("Код: " + event.code + " причина: " + event.reason);
    };
    socket.onmessage = request => {
      console.log("Получены данные " + request.data);
      console.log(request.data[0]);

      this.showSocket();
    };
    socket.onerror = error => {
      console.log("Ошибка " + error.message);
    };
  };
  render() {
    return (
      <div className="App">
        <h1>WebSocket App</h1>
        <div className="content">
          <div className="content-form">
            <form action="#">
              <label htmlFor="url">URL</label>
              <input
                onChange={this.handleInput}
                id="url"
                name="url"
                value="wss://test.devpizzasoft.ru/socket.io/"
              />

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

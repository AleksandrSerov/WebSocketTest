import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WebSocket App</h1>
        <div className="content">
          <div className="content-form">
            <form action="#">
              <label htmlFor="url">URL</label>
              <input id="url" />

              <label htmlFor="token">Token</label>
              <input id="token" />

              <label htmlFor="room">Room</label>
              <input id="room" />

              <button type="submit">Add</button>
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

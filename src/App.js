import React, { Component } from "react";
import "./App.css";
import List from "./containers/List/";
import Form from "./containers/Form/";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WebSocket App</h1>
        <div className="content">
          <Form />
          <List />
        </div>
      </div>
    );
  }
}

export default App;

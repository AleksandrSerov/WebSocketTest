import React, { Component } from "react";
import { connect } from "react-redux";

class List extends Component {
  render() {
    return (
      <div className="socketList">
        <div className="socketList-counter">Count of sockets:</div>
        <h2>Example</h2>
        <h2>Messages: {this.props.messages}</h2>
        <h2>CurrentRoom: {this.props.currentRoom}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    currentRoom: state.ui.currentRoom
  };
};

export default connect(mapStateToProps)(List);

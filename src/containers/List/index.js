import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import * as moment from "moment";
import "./List.css";
class List extends Component {
  toggleShowItem = event => {
    event.target.classList.toggle("append");
  };
  renderItems = arr => {
    return arr.map((item, i) => {
      const time = moment(item.timestamp * 1000).format("HH:mm:ss");
      JSON.stringify(item.data);
      const currentItem = (
        <tr key={i}>
          <th>{time}</th>
          <th>
            <div onClick={this.toggleShowItem} className="show">
              {JSON.stringify(item.room)}
              {JSON.stringify(item.data)}
            </div>
          </th>
        </tr>
      );

      return currentItem;
    });
  };
  render() {
    const messages = this.renderItems(this.props.messages);
    return (
      <div className="socketList">
        <div className="socketList-counter">
          Count: {this.props.messages.length}
          <h4>CurrentRoom: </h4>
          <span>{this.props.currentRoom}</span>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>{messages}</tbody>
        </Table>
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

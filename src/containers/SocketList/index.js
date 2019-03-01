import React, { Component } from "react";

export default class SocketList extends Component {
  toggleList = event => {
    const list = event.target.nextSibling;
    if (list.style.display === "block") {
      list.style.display = "none";
    } else {
      list.style.display = "block";
    }
  };
  renderItems = arr => {
    const { rooms } = this.props;
    let lists = [];
    for (let room of rooms) {
      const items = arr.map((item, i) => {
        if (item.room === room) {
          return <li key={i}>{JSON.stringify(item.data)}</li>;
        }
        return;
      });

      lists = [...lists, { room, items }];
    }
    return lists.map((list, i) => {
      return (
        <>
          <span className="roomName span" onClick={this.toggleList}>
            Room {list.room}
          </span>
          <ul key={i}>{list.items} </ul>
        </>
      );
    });
  };

  render() {
    const { data } = this.props;
    const items = data.length !== 0 ? this.renderItems(data) : "";
    return <div className="list">{items}</div>;
  }
}

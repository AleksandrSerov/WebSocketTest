import React, { Component } from "react";
import { connect } from "react-redux";
import "./SocketTable.js";

class SocketTable extends Component {
  render() {
    return <h2>Example</h2>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SocketTable);

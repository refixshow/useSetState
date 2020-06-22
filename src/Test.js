import React, { Component } from "react";

export default class Test extends Component {
  state = {};

  abc() {
    return { a: "a" };
  }

  componentDidMount() {
    this.setState(this.abc);
  }

  render() {
    return <div>{JSON.stringify(this.state, null, 1)}</div>;
  }
}

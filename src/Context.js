import React, { Component, createContext } from "react";

export const ValueContext = createContext();

export class Context extends Component {
  state = {
    user: {},
  };
  render() {
    return (
      <ValueContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

export default Context;

import React, { Component, createContext } from "react";

import io from "socket.io-client";

const socket = io("http://127.0.0.1:8000");

export const ValueContext = createContext();

export class Context extends Component {
  state = {
    user: {},
    modalOpen: false,
    post: true,
    businessTab: false,
    businesses: [],
    chatroom: [],
    chat: [],
    business: {},
    show: false,
    add: false,
    remove: false,
    product: false,
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/business/")
      .then((response) => response.json())
      .then((json) => this.setState({ businesses: json.businesses }));
    const _id = localStorage.getItem("userId");
    if (!_id) {
      this.setState({ show: true });
    }
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("business", (result) => {
      this.setState({ businesses: result.businesses });
    });

    socket.on("biz", (result) => this.setState({ business: result.biz }));
  }

  setUser = (user) => {
    this.setState({ user: user });
  };

  setModal = () => {
    this.setState({ modalOpen: !this.modalOpen });
  };

  setPost = () => this.setState({ post: true, businessTab: false });

  setBusinessTab = () => this.setState({ post: false, businessTab: true });

  setName = (e) => localStorage.setItem("firstName", e);

  setBusinesses = (e) => this.setState({ businesses: e });

  setChatroom = (e) => this.setState({ chatroom: e });

  setChat = (e) => this.setState({ chat: e });

  setBusiness = (e) => this.setState({ business: e });

  setShow = () => this.setState({ show: false });

  setAdd = () => this.setState({ add: !this.state.add });

  setRemove = () => this.setState({ remove: !this.state.remove });

  setProduct = () => this.setState({ product: !this.state.product });

  render() {
    return (
      <ValueContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          setModal: this.setModal,
          setPost: this.setPost,
          setBusinessTab: this.setBusinessTab,
          setName: this.setName,
          setId: this.setId,
          socket,
          setBusinesses: this.setBusinesses,
          setChatroom: this.setChatroom,
          setChat: this.setChat,
          setBusiness: this.setBusiness,
          setShow: this.setShow,
          setAdd: this.setAdd,
          setRemove: this.setRemove,
          setProduct: this.setProduct,
        }}
      >
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

export default Context;

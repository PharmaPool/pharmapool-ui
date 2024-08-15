import React, { Component, createContext } from "react";

import { jwtDecode } from "jwt-decode";

import io from "socket.io-client";

const socket = io("https://www.pharmapoolserver.com");

export const ValueContext = createContext();
const token = localStorage.getItem("token");

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
    friends: [],
    pharmacy: {},
    singlePost: {},
    allPosts: [],
    advertControl: false,
    login: false,
  };

  componentDidMount() {
    const _id = localStorage.getItem("userId");
    if (!_id) {
      this.setState({ show: true });
    }
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("posts", (result) => this.setState({ allPosts: result.posts }));

    socket.on("business", (result) => {
      this.setState({ businesses: result.businesses });
    });

    socket.on("biz", (result) => this.setState({ business: result.biz }));

    socket.on("post", (result) => this.setState({ posts: result.post }));
  }

  tokenChecker = () => {
    if (!token) {
      this.setState({ show: false });
      return null;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (
        decodedToken.exp > currentTime &&
        decodedToken.user.loggedIn === true
      ) {
        this.setState({ show: true, login: true });
        return token;
      } else if (decodedToken.user.loggedIn === false) {
        this.setState({ show: false, login: false });
        return null;
      } else {
        this.setState({ show: false, login: false });
        return null;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  logOut = () => this.setState({ login: false });

  openAdvert = () => this.setState({ advertControl: true });

  closeAdvert = () => this.setState({ advertControl: false });

  setPosts = (post) => {
    this.setState({ posts: post });
  };

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

  setShow = () => this.setState({ show: true });

  setAdd = () => this.setState({ add: !this.state.add });

  setRemove = () => this.setState({ remove: !this.state.remove });

  setProduct = () => this.setState({ product: !this.state.product });

  setPharmacy = (e) => this.setState({ pharmacy: e });

  setAllPosts = () =>
    fetch("https://www.pharmapoolserver.com/api/feed/posts", {
      headers: {
        Authorization: token,
      },
    }).catch((err) => console.log(err));

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
          setPharmacy: this.setPharmacy,
          setPosts: this.setPosts,
          setAllPosts: this.setAllPosts,
          openAdvert: this.openAdvert,
          closeAdvert: this.closeAdvert,
          tokenChecker: this.tokenChecker,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

export default Context;

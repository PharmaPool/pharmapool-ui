import "./App.css";
import HomePage from "./pages/Homepage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivateBusiness from "./pages/PrivateBusiness";
import Business from "./pages/Business";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import ChatRoom from "./pages/ChatRoom";
import SingleChat from "./pages/SingleChat";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import SingleChatRoom from "./pages/SingleChatRoom";
import SinglePost from "./pages/SinglePost";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/business" element={<Business />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Login />} />

          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/chatrooms" element={<ChatRoom />} />
          <Route exact path="/private_business" element={<PrivateBusiness />} />
          <Route exact path="/chats" element={<Chats />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/chat" element={<SingleChat />} />
          <Route exact path="/post" element={<SinglePost />} />
          <Route exact path="/chatroom" element={<SingleChatRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

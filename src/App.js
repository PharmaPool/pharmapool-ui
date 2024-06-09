import "./App.css";
import "./pharmapoolmedia.css";
import HomePage from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivateBusiness from "./pages/Business";
import Businesses from "./pages/Business/Businesses";
import Business from "./pages/Business/Business";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Posts from "./pages/Post";
import ChatRoom from "./pages/ChatRoom";
import SingleChat from "./pages/Chat/SingleChat";
import Profile from "./pages/Profile";
import UserProfile from "./pages/Profile/Profile";
import Chats from "./pages/Chat";
import SingleChatRoom from "./pages/ChatRoom/SingleChatRoom";
import SinglePost from "./pages/Post/SinglePost";
import Request from "./pages/Request";
import Notification from "./pages/Notification/";
import Pharmacy from "./pages/Pharmacy";
import Inventory from "./pages/Pharmacy/components/Inventory";
import PharmacyLogin from "./pages/Pharmacy/PharmacyLogin";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import ProductGallery from "./pages/ProductGallery";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/business" element={<Businesses />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/verify/:email" element={<VerifyAccount />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/reset-password/:email"
            element={<ResetPassword />}
          />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/chatrooms" element={<ChatRoom />} />
          <Route exact path="/private_business" element={<PrivateBusiness />} />
          <Route exact path="/business/:id" element={<Business />} />
          <Route exact path="/chats" element={<Chats />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/:id" element={<UserProfile />} />
          <Route exact path="/chat/:id" element={<SingleChat />} />
          <Route exact path="/post/:_id" element={<SinglePost />} />
          <Route exact path="/chatroom/:id" element={<SingleChatRoom />} />
          <Route exact path="/requests" element={<Request />} />
          <Route exact path="/notifications" element={<Notification />} />
          <Route exact path="/pharmacy" element={<PharmacyLogin />} />
          <Route exact path="/pharmacy/:id" element={<Pharmacy />} />
          <Route exact path="/pharmacy/:id/inventory" element={<Inventory />} />
          <Route exact path="/product-gallery" element={<ProductGallery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

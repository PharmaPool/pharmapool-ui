import React from "react";

import Logo from "../data/logo.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import Comments from "./Comments";

import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  return (
    <div className="business" onClick={()=>navigate("/post")}>
      <div className="business_head">
        <div className="user_image">
          <img src={Logo} alt="username" width={100} />
        </div>
        <div className="username">
          <h5>Wilson Zimthamaha Bonkuru</h5>
          <p>4 months ago</p>
        </div>
      </div>
      <div className="post">
        <div className="post_content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            perspiciatis eius, cum dolores excepturi dolor. Quasi ab eligendi
            optio expedita?
          </p>
        </div>
        <div className="post_image">
          <img src={Logo} alt="post_iamge" width={100} />
          <img src={Logo} alt="post_iamge" width={100} />
        </div>
      </div>
      <div className="post_interactions">
        <p>100 Likes</p>
        <p className="end">50 Comments</p>
      </div>
      <div className="post_interaction">
        <p>
          <ThumbUpIcon /> Like
        </p>
        <p className="end">
          <ChatBubbleOutlineIcon /> Comment
        </p>
      </div>
      <Comments />
    </div>
  );
}

export default Post;

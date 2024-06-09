import React from "react";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// import Comments from "./Comments";

import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  return (
    <div className="business">
      <div className="business_head">
        <div
          className="user_image"
          onClick={() => navigate(`/profile/${post.creator._id}`)}
        >
          <img src={post.creator.profileImage.imageUrl} alt="username" width={100} height={100} />
        </div>
        <div className="username">
          <h5>{post.creator.fullName}</h5>
          {/* <p>4 months ago</p> */}
        </div>
      </div>
      <div className="post" onClick={() => navigate(`/post/${post._id}`)}>
        <div className="post_content">
          <p>{post.content}</p>
        </div>
        <div className="post_image">
          {post.postImage ? (
            <img src={post.postImage.imageUrl} alt="post_iamge" />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="post_interactions">
        <p>{post.likes.length} likes</p>
        <p className="end">{post.comments.length} comments</p>
      </div>
      <div className="post_interaction">
        <p>
          <ThumbUpIcon /> Like
        </p>
        <p className="end">
          <ChatBubbleOutlineIcon /> Comment
        </p>
      </div>
      {/* {post.comments.length > 0 && <Comments comments={post.comments} />} */}
    </div>
  );
}

export default Post;

import React, { useContext, useState, useEffect } from "react";
import moment from "moment";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// import Comments from "./Comments";

import { useNavigate } from "react-router-dom";

import { ValueContext } from "../../../Context";

function Post({ post }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [clicked, setClicked] = useState(false);
  const { setAllPosts } = useContext(ValueContext);
  const token = localStorage.getItem("token");

  const handleLike = () => {
    if (clicked === true) {
      fetch(`http://127.0.0.1:8000/api/feed/post/${post._id}/like`, {
        method: "DELETE",
        body: JSON.stringify({
          userId,
        }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setAllPosts();
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`http://127.0.0.1:8000/api/feed/post/${post._id}/like`, {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          setAllPosts();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (post.likes.find((user) => user._id === userId) !== undefined) {
      setClicked(true);
    }
  }, []);

  return (
    <div className="business">
      <div className="business_head">
        <div
          className="user_image"
          onClick={() => navigate(`/profile/${post.creator._id}`)}
        >
          <img
            src={post.creator.profileImage.imageUrl}
            alt="username"
            width={100}
            height={100}
          />
        </div>
        <div className="username">
          <h5>{post.creator.fullName}</h5>
          <p>
            {moment.utc(post.createdAt).local().startOf("seconds").fromNow()}
          </p>
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
        <div onClick={handleLike}>
          <p onClick={() => setClicked(!clicked)}>
            <ThumbUpIcon color={clicked ? "primary" : "inherit"} /> Like
          </p>
        </div>
        <p className="end" onClick={() => navigate(`/post/${post._id}`)}>
          <ChatBubbleOutlineIcon /> Comment
        </p>
      </div>
      {/* {post.comments.length > 0 && <Comments comments={post.comments} />} */}
    </div>
  );
}

export default Post;

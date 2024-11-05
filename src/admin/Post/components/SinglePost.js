import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import Comments from "./Comments";

import Loading from "../../../data/loader.gif";
import { useNavigate } from "react-router-dom";

function SinglePost({ posts }) {
  const [open, setOpen] = useState(false);
  const [delet, setDelete] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const deletePost = () => {
    fetch(`http://127.0.0.1:8000/api/admin/post/${posts._id}`, {
      method: "DELETE",
      body: JSON.stringify({
        _id: posts.creator._id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) =>
        json.success ? window.location.reload(0) : navigate("/admin/auth")
      );
  };
  return (
    <>
      {posts ? (
        <div className="single_post">
          <div className="business">
            {!open && (
              <div class="admin_single_business_delete">
                <button
                  className="not_interest"
                  onClick={() => {
                    setOpen(true);
                    setDelete(true);
                  }}
                >
                  Delete post
                </button>
              </div>
            )}
            {open && delet && (
              <div class="admin_single_business_delete">
                <button className="not_interest" onClick={() => {
                  setOpen(false)
                  setDelete(false)
                }}>No</button>
                <button className="interest" onClick={deletePost}>Yes</button>
                <p>Are you sure?</p>
              </div>
            )}
            <div className="business_head">
              <div className="user_image">
                <img
                  src={posts.creator.profileImage.imageUrl}
                  alt="username"
                  width={100}
                />
              </div>
              <div className="username">
                <h5>{posts.creator.fullName}</h5>
                <p>
                  {moment
                    .utc(posts.createdAt)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
                </p>
              </div>
            </div>
            <div className="post">
              <div className="post_content">
                <p>{posts.content}</p>
              </div>
              <div className="post_image">
                {posts.postImage ? (
                  <img src={posts.postImage.imageUrl} alt="post_iamge" />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="post_interactions">
              <p>{posts.likes.length} Likes</p>
              <p className="end">{posts.comments.length} Comments</p>
            </div>
            <div className="post_interaction">
              <div>
                <p>
                  <ThumbUpIcon /> Like
                </p>
              </div>
              <p className="end">
                <ChatBubbleOutlineIcon /> Comment
              </p>
            </div>
            {posts.comment && (
              <div className="add_comment">
                <input type="text" placeholder="type comment" />
                <button className="interest">comment</button>
                <button className="x">x</button>
              </div>
            )}
            {posts.comments.length > 0 && (
              <Comments comments={posts.comments} postId={posts._id} />
            )}
          </div>
        </div>
      ) : (
        <div className="loader">
          <img src={Loading} alt="" />
        </div>
      )}
    </>
  );
}

export default SinglePost;

import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";

import Comments from "./components/Comments";
import PrivateHeader from "../../components/PrivateHeader";
import MediaHeader from "../../components/MediaHeader";

import Loading from "../../data/loader.gif";

import useWindowDimensions from "../../components/useWindowDimensions";

import { useParams, useNavigate } from "react-router-dom";
import { ValueContext } from "../../Context";

function SinglePost() {
  const { width } = useWindowDimensions();
  const { _id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [comment, setComment] = useState(false);
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(ValueContext);
  const userId = localStorage.getItem("userId");
  const [addComment, setAddComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/feed/post/${_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.post);
        console.log(data);
        if (data.post.likes.find((user) => user._id === userId) !== undefined) {
          setClicked(true);
        }
      })
      .catch((err) => console.log(err));
  }, [_id, navigate, userId, token, setPosts]);

  const handleLike = () => {
    if (clicked === true) {
      fetch(`http://127.0.0.1:8000/api/feed/post/${_id}/like`, {
        method: "DELETE",
        body: JSON.stringify({
          userId,
        }),
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.log(err));
    } else {
      fetch(`http://127.0.0.1:8000/api/feed/post/${_id}/like`, {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.log(err));
    }
  };

  const handleComment = () => {
    fetch(`http://127.0.0.1:8000/api/feed/post/${_id}/comment`, {
      method: "POST",
      body: JSON.stringify({
        content: addComment,
        userId,
      }),
      headers: { Authorization: token, "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setAddComment("");
        setComment(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      {posts ? (
        <div className="single_post">
          <div className="business">
            <div className="business_head">
              <div
                className="user_image"
                onClick={() => navigate(`/profile/${posts.creator._id}`)}
              >
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
              <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {posts.content}
              </pre>
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
              <div onClick={handleLike}>
                <p onClick={() => setClicked(!clicked)}>
                  <ThumbUpIcon color={clicked ? "primary" : "inherit"} /> Like
                </p>
              </div>
              <p className="end" onClick={() => setComment(true)}>
                <ChatBubbleOutlineIcon /> Comment
              </p>
            </div>
            {comment && (
              <div className="add_comment">
                <div>
                  <input
                    type="text"
                    placeholder="type comment"
                    value={addComment}
                    onChange={(e) => setAddComment(e.target.value)}
                  />
                  <button className="interest" onClick={handleComment}>
                    comment
                  </button>
                </div>
                <button className="x" onClick={() => setComment(false)}>
                  <CloseIcon />
                </button>
              </div>
            )}
            {posts.comments.length > 0 && (
              <Comments comments={posts.comments} postId={_id} />
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

import React, { useState, useEffect } from "react";

import Logo from "../../data/logo.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import Comments from "./components/Comments";
import PrivateHeader from "../../components/PrivateHeader";
import MediaHeader from "../../components/MediaHeader";

import Loading from "../../data/loader.gif";

import useWindowDimensions from "../../components/useWindowDimensions";

import { useParams, useNavigate } from "react-router-dom";

function SinglePost() {
  const { width } = useWindowDimensions();
  const { _id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [comment, setComment] = useState(false);
  const [data, setData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/feed/post/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.post);
      })
      .catch((err) => console.log(err));
  }, [_id]);
  return (
    <>
      {width > 900 ? <PrivateHeader /> : <MediaHeader />}
      {data ? (
        <div className="single_post">
          <div className="business">
            <div className="business_head">
              <div
                className="user_image"
                onClick={() => navigate(`/profile/${data.creator._id}`)}
              >
                <img
                  src={data.creator.profileImage.imageUrl}
                  alt="username"
                  width={100}
                />
              </div>
              <div className="username">
                <h5>{data.creator.fullName}</h5>
                <p>4 months ago</p>
              </div>
            </div>
            <div className="post">
              <div className="post_content">
                <p>{data.content}</p>
              </div>
              <div className="post_image">
                {data.postImage ? (
                  <img src={data.postImage.imageUrl} alt="post_iamge" />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="post_interactions">
              <p>{data.likes.length} Likes</p>
              <p className="end">{data.comments.length} Comments</p>
            </div>
            <div className="post_interaction">
              <p onClick={() => setClicked(!clicked)}>
                <ThumbUpIcon color={clicked ? "primary" : "inherit"} /> Like
              </p>
              <p className="end" onClick={() => setComment(true)}>
                <ChatBubbleOutlineIcon /> Comment
              </p>
            </div>
            {comment && (
              <div className="add_comment">
                <input type="text" placeholder="type comment" />
                <button className="interest">comment</button>
                <button className="x" onClick={() => setComment(false)}>
                  x
                </button>
              </div>
            )}
            {data.comments.length > 0 && <Comments comments={data.comments} />}
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

import React, { useEffect, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import PostModal from "./components/PostModal";
import Post from "./components/Post";
import PostLoader from "./components/PostLoader";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Posts() {
  const { width } = useWindowDimensions();
  const { allPosts, setAllPosts } = useContext(ValueContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate("/signin");
    }
    fetch("http://127.0.0.1:8000/api/feed/posts", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setAllPosts(data.posts))
      .catch((err) => console.log(err));
  }, [token, setAllPosts, navigate]);
  return (
    <>
      {width > 900 ? <PrivateHeader /> : <MediaHeader />}

      <div className="posts">
        <div className="create_business">
          <PostModal />
        </div>
        {allPosts ? (
          <div className="post_body">
            {allPosts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
        ) : (
          <PostLoader />
        )}
      </div>
    </>
  );
}

export default Posts;

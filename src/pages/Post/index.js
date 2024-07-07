import React, { useEffect, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import PostModal from "./components/PostModal";
import Post from "./components/Post";
import Loading from "../../data/loader.gif";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";

function Posts() {
  const { width } = useWindowDimensions();
  const { allPosts, setAllPosts } = useContext(ValueContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/feed/posts")
      .then((response) => response.json())
      .then((data) => setAllPosts(data.posts))
      .catch((err) => console.log(err));
  }, []);
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
          <div className="loader">
            <img src={Loading} alt="" />
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;

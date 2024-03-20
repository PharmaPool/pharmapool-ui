import React from "react";

import PrivateHeader from "../components/PrivateHeader";
import Post from "../components/Post";

import { useNavigate } from "react-router-dom";

function Posts() {
  const navigate = useNavigate()
  return (
    <>
      <PrivateHeader />
      <div className="posts">
        <div className="post_body">
          <Post onClick={()=>navigate("/post")} />
        </div>
      </div>
    </>
  );
}

export default Posts;

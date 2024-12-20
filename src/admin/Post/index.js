import React, { useState, useEffect } from "react";
import "./index.css";

import AdminHeader from "../components/AdminHeader";
import SinglePost from "./components/SinglePost";
import { useNavigate } from "react-router-dom";

function AdminPost() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/posts", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate("/admin/auth");
        }
        const reversePosts = json.posts.reverse();
        setPosts(reversePosts);
      })
      .catch((err) => console.log(err));
  }, [token]);
  return (
    <>
      <AdminHeader />
      <div className="admin_posts">
        {posts.map((post, i) => (
          <SinglePost posts={post} key={i} />
        ))}
      </div>
    </>
  );
}

export default AdminPost;

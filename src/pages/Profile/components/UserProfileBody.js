import React, { useContext } from "react";

import Post from "../../Post/components/Post";
import SingleBusiness from "../../Business/components/SingleBusiness";

import { ValueContext } from "../../../Context";

function UserProfileBody({ posts, businesses }) {
  const _id = localStorage.getItem("userId");
  const { post, businessTab } = useContext(ValueContext);
  return (
    <div className="profile_body">
      {post && posts.map((post, i) => <Post post={post} key={i} />)}
      {businessTab &&
        businesses.map((biz, i) => {
          if (biz.creator._id.toString() === _id.toString()) {
            return <SingleBusiness business={biz} key={i} />;
          }
        })}
    </div>
  );
}

export default UserProfileBody;
